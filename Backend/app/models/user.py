from sqlalchemy.orm import Mapped, mapped_column,relationship
from sqlalchemy import String, Integer, DateTime,Boolean
from typing import Optional,List
from datetime import datetime
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column('id',primary_key=True, index=True,autoincrement = True)
    
    email: Mapped[str] = mapped_column(
        String, unique=True, nullable=False, index=True
    )
    username:Mapped[str] = mapped_column(String(40),nullable=False,unique=True,index=True)
    
    password: Mapped[Optional[str]] = mapped_column(String, nullable=False)
    
    name: Mapped[str] = mapped_column(String, nullable=True)
    
    is_active:Mapped[bool] = mapped_column(Boolean,default=True,nullable=False)
    
    image_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, nullable=False
    )
    updated_at:Mapped[datetime] = mapped_column(DateTime,default = datetime.now,onupdate=datetime.now)
    level: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    
    xp: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    wallets: Mapped[List['Wallet']] = relationship('Wallet',back_populates="user", cascade="all, delete-orphan",lazy='selectin') # type: ignore
