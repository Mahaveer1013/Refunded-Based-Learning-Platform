from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from .models import *
from .schemas import *
from .database import MongoDB
from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


class AuthService:
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str):
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password: str):
        return pwd_context.hash(password)

    @staticmethod
    async def get_user_by_email(
        db: AsyncIOMotorDatabase, email: str
    ) -> Optional[UserInDB]:
        user = await db.users.find_one({"email": email})
        return UserInDB(**user) if user else None

    @staticmethod
    async def get_user_by_id(
        db: AsyncIOMotorDatabase, user_id: str
    ) -> Optional[UserInDB]:
        user = await db.users.find_one({"_id": PyObjectId(user_id)})
        if user:
            return UserInDB(**user)
        else:
            return None

    @staticmethod
    async def authenticate_user(db: AsyncIOMotorDatabase, email: str, password: str):
        user = await AuthService.get_user_by_email(db, email)
        if not user:
            return None
        if not AuthService.verify_password(password, user.hashed_password):
            return None
        return user

    @staticmethod
    async def create_user(db: AsyncIOMotorDatabase, user_data: UserCreate):
        existing_user = await AuthService.get_user_by_email(db, user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        hashed_password = AuthService.get_password_hash(user_data.password)
        user = UserInDB(
            **user_data.dict(exclude={"password", "confirm_password"}),
            hashed_password=hashed_password,
        )

        result = await db.users.insert_one(user.dict(by_alias=True, exclude={"id"}))
        created_user = await AuthService.get_user_by_id(db, str(result.inserted_id))

        # Create wallet for user
        wallet = Wallet(user_id=PyObjectId(result.inserted_id))
        await db.wallets.insert_one(wallet.dict(by_alias=True, exclude={"id"}))
        print(created_user)
        return created_user

    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
        )
        return encoded_jwt

    @staticmethod
    def create_tokens(user: UserInDB):
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = AuthService.create_access_token(
            data={"sub": str(user.id)}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}

    @staticmethod
    async def get_current_user(
        db: AsyncIOMotorDatabase = Depends(MongoDB.get_db),
        token: str = Depends(oauth2_scheme),
    ):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )
            user_id: str = payload.get("sub")
            if user_id is None:
                raise credentials_exception
            token_data = TokenData(id=user_id)
        except JWTError:
            raise credentials_exception

        user = await AuthService.get_user_by_id(db, token_data.id)
        if user is None:
            raise credentials_exception

        # Check if token is blacklisted
        blacklisted_token = await db.token_blacklist.find_one({"token": token})
        if blacklisted_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been invalidated",
            )

        return user

    @staticmethod
    async def get_current_active_user(
        current_user: UserInDB = Depends(get_current_user),
    ):
        if not current_user.is_active:
            raise HTTPException(status_code=400, detail="Inactive user")
        return current_user

    @staticmethod
    async def logout(db: AsyncIOMotorDatabase, token: str):
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )
            expires_at = datetime.fromtimestamp(payload["exp"])
        except JWTError:
            expires_at = datetime.utcnow() + timedelta(minutes=15)

        blacklist_token = TokenBlacklist(token=token, expires_at=expires_at)
        await db.token_blacklist.insert_one(blacklist_token.dict(by_alias=True))
        return True

    @staticmethod
    def generate_password_reset_token(user_id: str):
        expires = timedelta(hours=settings.PASSWORD_RESET_TOKEN_EXPIRE_HOURS)
        return AuthService.create_access_token(
            data={"sub": user_id, "type": "password_reset"}, expires_delta=expires
        )

    @staticmethod
    async def verify_password_reset_token(token: str):
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )
            if payload.get("type") != "password_reset":
                return None
            user_id = payload.get("sub")
            if not user_id:
                return None
            return user_id
        except JWTError:
            return None

    @staticmethod
    async def update_password(
        db: AsyncIOMotorDatabase, user_id: str, new_password: str
    ):
        hashed_password = AuthService.get_password_hash(new_password)
        await db.users.update_one(
            {"_id": PyObjectId(user_id)}, {"$set": {"hashed_password": hashed_password}}
        )
        updated_user = await AuthService.get_user_by_id(db, user_id)
        return updated_user

    @staticmethod
    async def send_password_reset_email(email: str, token: str):
        reset_link = f"{settings.FRONTEND_URL}/reset-password?token={token}"
        print(f"Password reset link for {email}: {reset_link}")
