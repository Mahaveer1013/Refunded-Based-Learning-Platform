from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
from .config import settings

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    async def connect(cls):
        cls.client = AsyncIOMotorClient(settings.MONGODB_URI)
        cls.db = cls.client[settings.MONGODB_NAME]
        try:
            # Verify connection
            await cls.client.admin.command('ping')
            print("Connected to MongoDB")
        except ConnectionFailure:
            raise Exception("Failed to connect to MongoDB")

    @classmethod
    async def close(cls):
        cls.client.close()

    @classmethod
    async def get_db(cls):
        if not cls.client:
            await cls.connect()
        return cls.db