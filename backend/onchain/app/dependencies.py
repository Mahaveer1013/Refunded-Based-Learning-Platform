from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from .services import AuthService, oauth2_scheme
from .models import UserInDB
from .database import MongoDB

async def get_current_user(db: AsyncIOMotorDatabase = Depends(MongoDB.get_db), token: str = Depends(oauth2_scheme)):
    return await AuthService.get_current_user(db, token)

async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
    return await AuthService.get_current_active_user(current_user)