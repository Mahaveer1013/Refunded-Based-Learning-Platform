from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel
from ..database import MongoDB
from ..models import (
    UserCreate,
    UserInDB,
    Token,
    PasswordResetRequest,
    PasswordReset,
)
from ..services import AuthService
from ..dependencies import get_current_active_user

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register", response_model=UserInDB, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: AsyncIOMotorDatabase = Depends(MongoDB.get_db)):
    return await AuthService.create_user(db, user)

@router.post("/login", response_model=Token)
async def login(
    login_data: LoginRequest, 
    db: AsyncIOMotorDatabase = Depends(MongoDB.get_db)
):
    user = await AuthService.authenticate_user(db, login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return AuthService.create_tokens(user)

@router.post("/logout")
async def logout(
    request: Request,
    db: AsyncIOMotorDatabase = Depends(MongoDB.get_db),
):
    credentials: HTTPAuthorizationCredentials = await security(request)
    token = credentials.credentials

    await AuthService.logout(db, token)
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserInDB)
async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
    return current_user

@router.post("/request-password-reset")
async def request_password_reset(
    request: PasswordResetRequest, 
    db: AsyncIOMotorDatabase = Depends(MongoDB.get_db)
):
    user = await AuthService.get_user_by_email(db, request.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this email does not exist",
        )
    
    reset_token = AuthService.generate_password_reset_token(str(user.id))
    await AuthService.send_password_reset_email(user.email, reset_token)

    return {"message": "Password reset link sent to your email"}

@router.post("/reset-password")
async def reset_password(
    reset_data: PasswordReset, 
    db: AsyncIOMotorDatabase = Depends(MongoDB.get_db)
):
    user_id = await AuthService.verify_password_reset_token(reset_data.token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired password reset token",
        )

    user = await AuthService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    await AuthService.update_password(db, user_id, reset_data.new_password)
    return {"message": "Password has been reset successfully"}