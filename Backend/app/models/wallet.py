from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey, DateTime,Enum
from datetime import datetime
from app.core.database import Base
from app.schemas.enums import WalletType,ChainType



class Wallet(Base):
    __tablename__ = "wallets"

    id: Mapped[int] = mapped_column('id',primary_key=True, index=True,autoincrement= True)
    
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id",ondelete='CASCADE'), nullable=False)
    
    address: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    
    type: Mapped[WalletType] = mapped_column(Enum(WalletType), nullable=False,default = WalletType.primary)
    
    chain: Mapped[ChainType] = mapped_column(Enum(ChainType), nullable=False,default=ChainType.solana)
    
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, nullable=False
    )
    
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, onupdate=datetime.now
    )

    # Optional: ORM relationship back to User
    user: Mapped["User"] = relationship('User',back_populates="wallets",lazy='selectin') # type: ignore
