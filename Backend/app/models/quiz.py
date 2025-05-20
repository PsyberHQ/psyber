from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, ForeignKey, DateTime, JSON, func, UniqueConstraint
from app.core.database import Base
from app.schemas.quiz import OptionSchema
from datetime import datetime

class InitQuizResult(Base):
    __tablename__ = "init_quiz_results"
    __table_args__ = (UniqueConstraint("user_id", name="uq_user_initquiz"),)

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, unique=True)
    score: Mapped[int] = mapped_column(nullable=False)
    badge: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(),default=datetime.now)

    user = relationship("User", backref="init_quiz_result",lazy="selectin",uselist=False)


class InitQuizQuestion(Base):
    __tablename__ = "init_quiz_questions"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    question: Mapped[str] = mapped_column(String, nullable=False)
    options: Mapped[list[OptionSchema]] = mapped_column(JSON, nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(),default=datetime.now)
    updated_at:Mapped[DateTime] = mapped_column(DateTime(timezone=True),onupdate=datetime.now,server_default=func.now())
