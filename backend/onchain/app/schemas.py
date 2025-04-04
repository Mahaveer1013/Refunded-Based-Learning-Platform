from typing import Optional
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationInfo, ConfigDict
from bson import ObjectId
from pydantic_core import core_schema

class PyObjectId(str):
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type, _handler):
        return core_schema.no_info_after_validator_function(
            cls.validate,
            core_schema.str_schema(),
            serialization=core_schema.to_string_ser_schema(),
        )

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)

class UserBase(BaseModel):
    email: EmailStr
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: Optional[str] = Field(None, max_length=50)
    phone: str = Field(..., min_length=10, max_length=15)

    @field_validator("phone", mode="before")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        if not v.isdigit():
            raise ValueError("Phone must contain only digits")
        return v

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)
    confirm_password: str = Field(..., min_length=6)

    @field_validator("confirm_password", mode="before")
    @classmethod
    def passwords_match(cls, v: str, info: ValidationInfo) -> str:
        if "password" in info.data and v != info.data["password"]:
            raise ValueError("Passwords do not match")
        return v

class UserInDB(UserBase):
    id: Optional[PyObjectId] = Field(None, alias="_id")
    hashed_password: str
    is_active: bool = False
    is_verified: bool = False
    is_superuser: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
    )

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

class TransactionType(str, Enum):
    RECHARGE = "recharge"
    PURCHASE = "purchase"
    COMPLETION_REFUND = "completion_refund"
    WITHDRAWAL = "withdrawal"

class WalletBase(BaseModel):
    balance: float = 0.0
    locked_balance: float = 0.0

class WalletCreate(WalletBase):
    user_id: PyObjectId

class Wallet(WalletBase):
    id: Optional[PyObjectId] = Field(None, alias="_id")
    user_id: PyObjectId
    status: str = "active"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
    )

class CourseBase(BaseModel):
    title: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: float

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: Optional[PyObjectId] = Field(None, alias="_id")
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
    )

class CourseEnrollmentBase(BaseModel):
    user_id: PyObjectId
    course_id: PyObjectId
    amount_paid: float

class CourseEnrollmentCreate(CourseEnrollmentBase):
    pass

class CourseEnrollment(CourseEnrollmentBase):
    id: Optional[PyObjectId] = Field(None, alias="_id")
    is_completed: bool = False
    completion_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
    )

class TransactionBase(BaseModel):
    user_id: PyObjectId
    amount: float
    transaction_type: TransactionType
    reference_id: Optional[str] = None
    notes: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: Optional[PyObjectId] = Field(None, alias="_id")
    status: str = "completed"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
    )

class BalanceResponse(BaseModel):
    available_balance: float
    locked_balance: float
    total_balance: float