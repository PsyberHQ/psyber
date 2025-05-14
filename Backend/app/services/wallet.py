from email.policy import HTTP
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.wallet import Wallet
from app.schemas.wallet import WalletBase,WalletShow
from app.models.user import User
from fastapi import HTTPException
from app.core.configs import logger


async def create_user_wallet(wallet: WalletBase, db: AsyncSession,current_user:User) -> WalletShow:
    """
    Create a new wallet in the database.
    """
    current_user.wallet = Wallet(**wallet.model_dump(),user_id=current_user.id)
    try:
        db.add(current_user.wallet)
    except Exception as e:
        logger.error(f"Error creating wallet: {e}")
        raise HTTPException(status_code=400, detail="Wallet already exists")
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)
    return current_user.wallet

async def get_current_user_wallet(current_user: User) -> WalletShow:
    """
    Get the current wallet of the current_user.
    """
    wallet = current_user.wallet if current_user.wallet else None
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return wallet