from app.core.configs import DB_URL,DEBUG_MODE,logger
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker
from contextlib import asynccontextmanager

if DEBUG_MODE:
    db_url = "sqlite+aiosqlite:///./database.db"
    connect_args = {"check_same_thread": False}
elif DB_URL:
    db_url = DB_URL.replace("postgresql://", "postgresql+asyncpg://") if DB_URL.startswith("postgresql://") else DB_URL
    connect_args = {}  # No special args for PostgreSQL
else:
    raise ValueError("No valid database URL found. Check your configuration.")

engine = create_async_engine(url=db_url,connect_args=connect_args)
AsyncSessionLocal = async_sessionmaker(bind=engine)
Base = declarative_base()


async def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    except Exception:
        await db.rollback()
        raise 
    finally:
        await db.close()
        
