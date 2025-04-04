from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .routers.auth_routes import router as auth_router
from .routers.payment_webhook import router as payment_webhook_router
from .services import AuthService
from .database import MongoDB
from .schemas import UserCreate
from .config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await MongoDB.connect()
    db = await MongoDB.get_db()
    try:
        user: UserCreate = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            confirm_password=settings.FIRST_SUPERUSER_PASSWORD,
            first_name="Admin",
            last_name="User",
            phone="1234567890",
        )
        if await AuthService.get_user_by_email(db, user.email) is None:
            await AuthService.create_user(db, user)
    except Exception as e:
        print(e)
    yield
    await MongoDB.close()


app = FastAPI(lifespan=lifespan)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(payment_webhook_router)


@app.get("/")
async def root():
    return {"message": "Authentication Service"}
