from pydantic import BaseModel
from typing import Optional
from app.models.wallet import Wallet
from app.schemas.enums import WalletType,ChainType
from datetime import datetime

class WalletBase(BaseModel):
    user_id:Optional[int] = None
    address:str
    type:Optional[WalletType]= WalletType.primary
    chain:Optional[ChainType]= ChainType.solana
    
class WalletCreate(BaseModel):
    address:str
    type:Optional[WalletType]= WalletType.primary
    chain:Optional[ChainType]= ChainType.solana

    
class WalletShow(WalletBase):
    created_at: datetime
    updated_at:datetime
    id:int
    class Config:
        from_attributes = True
        
    