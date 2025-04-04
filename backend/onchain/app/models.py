from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from bson import ObjectId
from pydantic_core import core_schema
from pydantic import GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue


class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(
        cls, _source_type, _handler
    ) -> core_schema.CoreSchema:
        def validate(value: str) -> ObjectId:
            if not ObjectId.is_valid(value):
                raise ValueError("Invalid ObjectId")
            return ObjectId(value)

        return core_schema.no_info_plain_validator_function(
            function=validate,
            serialization=core_schema.to_string_ser_schema(),
        )

    @classmethod
    def __get_pydantic_json_schema__(
        cls, _core_schema: core_schema.CoreSchema, handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        return handler(core_schema.str_schema())


class TransactionType(str, Enum):
    RECHARGE = "recharge"
    PURCHASE = "purchase"
    COMPLETION_REFUND = "completion_refund"
    WITHDRAWAL = "withdrawal"


class WalletStatus(str, Enum):
    ACTIVE = "active"
    SUSPENDED = "suspended"
    CLOSED = "closed"


class UserBase(BaseModel):
    email: EmailStr
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: Optional[str] = Field(None, max_length=50)
    phone: Optional[str] = Field(None, min_length=10, max_length=15)


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)
    confirm_password: str = Field(..., min_length=6)


class UserInDB(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    hashed_password: str
    is_active: bool = True
    is_verified: bool = False
    is_superuser: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None


class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordReset(BaseModel):
    token: str
    new_password: str = Field(..., min_length=6)


class Wallet(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: PyObjectId
    balance: float = 0.0
    locked_balance: float = 0.0
    status: WalletStatus = WalletStatus.ACTIVE
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}


class Course(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: float
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}


class CourseEnrollment(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: PyObjectId
    course_id: PyObjectId
    amount_paid: float
    is_completed: bool = False
    completion_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}


class Transaction(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: PyObjectId
    amount: float
    transaction_type: TransactionType
    reference_id: Optional[str] = None
    status: str = "completed"
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}


class TokenBlacklist(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    token: str
    expires_at: datetime

    class Config:
        json_encoders = {ObjectId: str}
