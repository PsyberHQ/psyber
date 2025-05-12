from typing import Generator
from fastapi import FastAPI 
from contextlib import asynccontextmanager
from app.core.database import Base,engine
from app.models.user import User
from app.models.wallet import Wallet
from app.models import task
from app.models import quiz
from app.core.configs import DEBUG_MODE,logger

@asynccontextmanager # type: ignore
async def lifespan(app:FastAPI) :
    async with engine.begin() as conn:
        '''if DEBUG_MODE:
            await conn.run_sync(Base.metadata.drop_all)
            logger.info('Tables Dropped')'''
        await conn.run_sync(Base.metadata.create_all)
        logger.info("Tables Created")
        
        
    yield
        
