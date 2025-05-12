from sqlalchemy import ForeignKey, String, Integer, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.schemas.enums import ContentType,TaskType
# Option
class Option(Base):
    __tablename__ = "options"

    id: Mapped[int] = mapped_column('id', primary_key=True, index=True, autoincrement=True)
    content: Mapped[str] = mapped_column(String, nullable=False)
    quiz_id: Mapped[int] = mapped_column(ForeignKey("quizzes.id"))

# Quiz
class Quiz(Base):
    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column('id', primary_key=True, index=True, autoincrement=True)
    question: Mapped[str] = mapped_column(String, nullable=False)
    correct_option_id: Mapped[int] = mapped_column(ForeignKey("options.id"))

    options: Mapped[list["Option"]] = relationship("Option", cascade="all, delete", backref="quiz",foreign_keys=[Option.quiz_id])
    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))

# Content
class Content(Base):
    __tablename__ = "contents"

    id: Mapped[int] = mapped_column('id', primary_key=True, index=True, autoincrement=True)
    type: Mapped[ContentType] = mapped_column(Enum(ContentType), nullable=False)
    heading: Mapped[str | None] = mapped_column(String, nullable=False)
    content: Mapped[str | None] = mapped_column(String, nullable=False)
    image: Mapped[str | None] = mapped_column(String, nullable=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))

# Lesson
class Lesson(Base):
    __tablename__ = "lessons"

    id: Mapped[int] = mapped_column('id', primary_key=True, index=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    special_image: Mapped[str | None] = mapped_column(String)

    content: Mapped[list["Content"]] = relationship("Content", cascade="all, delete", backref="lesson")
    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))

# Task
class Task(Base):
    __tablename__ = "tasks"
    id: Mapped[int] = mapped_column('id', primary_key=True, index=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    learning_tip: Mapped[str] = mapped_column(String, nullable=False)
    reward: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[TaskType] = mapped_column(Enum(TaskType), nullable=False)

    lessons: Mapped[list["Lesson"]] = relationship("Lesson", cascade="all, delete", backref="task")
    quiz: Mapped[list["Quiz"]] = relationship("Quiz", cascade="all, delete", backref="task")





