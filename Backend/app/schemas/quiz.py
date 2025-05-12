from pydantic import BaseModel
from typing import Optional,List,Dict
from datetime import datetime
from app.schemas.enums import BadgeLevel

# Base Schema
class InitQuizQuestionBase(BaseModel):
    index: int
    question: str
    options: List[Dict]

# Create Schema
class InitQuizQuestionCreate(InitQuizQuestionBase):
    pass

# Update Schema
class InitQuizQuestionUpdate(BaseModel):
    index: Optional[int]
    question: Optional[str]
    options: Optional[List[Dict]]

# Show Schema
class InitQuizQuestionShow(InitQuizQuestionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
        
# Base Schema
class InitQuizResultBase(BaseModel):
    score: int
    badge: str

# Create Schema
class InitQuizResultCreate(InitQuizResultBase):
    user_id: int

# Update Schema
class InitQuizResultUpdate(BaseModel):
    score: Optional[int]
    badge: Optional[str]

# Show Schema
class InitQuizResultShow(InitQuizResultBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
        


class OptionSchema(BaseModel):
    text: str
    points: int


class QuestionSchema(BaseModel):
    id: int
    index: int
    question: str
    options: List[OptionSchema]


class AnswerSchema(BaseModel):
    id: int
    answer: str


class SubmitQuizRequest(BaseModel):
    answers: List[AnswerSchema]

class SubmitQuizResponse(BaseModel):
    user_id:int
    badge: BadgeLevel