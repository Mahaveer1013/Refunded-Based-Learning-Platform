import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ALGORITHM: str = "HS256"
    TOKEN_EXPIRE_MINUTES: int = 60000
    PASSWORD_RESET_TOKEN_EXPIRE_MINUTES: int = 300
    # DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:////database.db")
    FIRST_SUPERUSER: str = os.getenv("FIRST_SUPERUSER", "admin@gmail.com")
    FIRST_SUPERUSER_PASSWORD: str = os.getenv("FIRST_SUPERUSER_PASSWORD", "admin@123")
    RAZORPAY_WEBHOOK_SECRET: str = os.getenv(
        "RAZORPAY_WEBHOOK_SECRET", "your_secret_here"
    )
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "your_smtp_username")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "your_smtp_password")
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", 587))
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    MONGODB_NAME: str = os.getenv("MONGODB_NAME", "refunded_learning_platform")

settings = Settings()
