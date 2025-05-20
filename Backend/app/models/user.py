from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, DateTime, Boolean, func,Enum
from typing import Optional, List
from datetime import datetime
from app.schemas.enums import BadgeLevel
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column('id', primary_key=True, index=True, autoincrement=True)
    
    email: Mapped[str] = mapped_column(
        String, unique=True, nullable=False, index=True
    )
    username: Mapped[str] = mapped_column(String(40), nullable=False, unique=True, index=True)
    
    password: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    name: Mapped[str] = mapped_column(String, nullable=True)
    
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    
    image_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, onupdate=datetime.now, server_default=func.now()
    )
    level: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    
    xp: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    wallet: Mapped[List['Wallet']] = relationship('Wallet', back_populates="user", cascade="all, delete-orphan", lazy='selectin',uselist=False)  # type: ignore
    badge:Mapped[BadgeLevel] = mapped_column(Enum(BadgeLevel),nullable=False,default=BadgeLevel.BEGINNER)
    
    init_quiz_result: Mapped[Optional['InitQuizResult']] = relationship("InitQuizResult",back_populates="user",lazy="selectin",uselist=False) # type: ignore

