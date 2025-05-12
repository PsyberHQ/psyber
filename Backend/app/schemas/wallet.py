from pydantic import BaseModel
from typing import Optional
from app.models.wallet import Wallet
from app.schemas.enums import WalletType,ChainType
from datetime import datetime
class WalletBase(BaseModel):
    user_id:Optional[int] = None
    address:str
    type:Optional[WalletType]=None
    chain:Optional[ChainType]= None
    
class WalletShow(WalletBase):
    created_at: datetime
    updated_at:datetime