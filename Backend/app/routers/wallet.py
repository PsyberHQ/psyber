from fastapi import APIRouter
from app.core.dependencies import DBSession
from app.schemas.wallet import WalletCreate,WalletShow 
from app.services.user import ActiveUser
from app.services.wallet import create_user_wallet,get_current_user_wallet

router = APIRouter(prefix='/wallet',tags=['Wallet'])

@router.post('/create-wallet',response_model=WalletShow)
async def create_wallet(wallet:WalletCreate,db:DBSession,current_user:ActiveUser):
    """
    Create a new wallet for the current user.
    """
    return await create_user_wallet(wallet=wallet,db=db,current_user=current_user) # type: ignore

@router.get('/current-wallet',response_model=WalletShow)
async def get_current_wallet(current_user:ActiveUser) -> WalletShow:
    """
    Get the current wallet of the user.
    """
    return await get_current_user_wallet(current_user=current_user)