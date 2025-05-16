from pydantic import BaseModel
from typing import Optional,List,Dict
from datetime import datetime
from app.schemas.enums import BadgeLevel



class OptionSchema(BaseModel):
    text: str
    points: int

# Base Schema
class InitQuizQuestionBase(BaseModel):
    id: int
    question: str
    options: List[Dict]

# Create Schema
class InitQuizQuestionCreate(InitQuizQuestionBase):
    pass

# Update Schema
class InitQuizQuestionUpdate(BaseModel):
    index: Optional[int]
    question: Optional[str]
    options: Optional[List[OptionSchema]]

# Show Schema
class InitQuizQuestionShow(InitQuizQuestionBase):
    id: int
    created_at: datetime
    updated_at: datetime

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
        


class QuestionSchema(BaseModel):
    id: int
    question: str
    options: List[OptionSchema]


class AnswerSchema(BaseModel):
    id: int
    answer: str


class SubmitQuizRequest(BaseModel):
    answers: List[AnswerSchema]

comment = "You're just starting your web3 journey, and that's perfectly okay! Everyone begins somewhere. With a bit of guidance, you'll quickly pick up the basics."

second_comment ="You might be unfamiliar with some web3 terms, but don't worry, we'll take it step-by-step."

class SubmitQuizResponse(BaseModel):
    user_id:int
    badge: BadgeLevel
    comment:Optional[str] = comment
    second_comment:Optional[str] = second_comment
    