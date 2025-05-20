from pydantic import BaseModel
from typing import List, Optional
from app.schemas.enums import TaskType, ContentType
from pydantic import BaseModel
from typing import List, Optional


# Base Schema
class OptionBase(BaseModel):
    content: str

# Create Schema
class OptionCreate(OptionBase):
    quiz_id: int

# Update Schema
class OptionUpdate(BaseModel):
    content: Optional[str]

# Show Schema
class OptionShow(OptionBase):
    id: int

    class Config:
        from_attributes = True
        
# Base Schema
class QuizBase(BaseModel):
    question: str
    correct_option_id: int

# Create Schema
class QuizCreate(QuizBase):
    task_id: int

# Update Schema
class QuizUpdate(BaseModel):
    question: Optional[str]
    correct_option_id: Optional[int]

# Show Schema
class QuizShow(QuizBase):
    id: int
    options: List["OptionShow"]

    class Config:
        from_attributes = True
        
# Base Schema
class ContentBase(BaseModel):
    type: ContentType
    heading: Optional[str]
    content: Optional[str]
    image: Optional[str]

# Create Schema
class ContentCreate(ContentBase):
    lesson_id: int

# Update Schema
class ContentUpdate(BaseModel):
    type: Optional[ContentType]
    heading: Optional[str]
    content: Optional[str]
    image: Optional[str]

# Show Schema
class ContentShow(ContentBase):
    id: int

    class Config:
        from_attributes = True
# Base Schema
class LessonBase(BaseModel):
    title: str
    special_image: Optional[str]

# Create Schema
class LessonCreate(LessonBase):
    pass

# Update Schema
class LessonUpdate(BaseModel):
    title: Optional[str]
    special_image: Optional[str]

# Show Schema
class LessonShow(LessonBase):
    id: int
    content: List["ContentShow"]

    class Config:
        from_attributes = True
# Base Schema
class TaskBase(BaseModel):
    title: str
    description: str
    learning_tip: str
    reward: str
    type: TaskType

# Create Schema
class TaskCreate(TaskBase):
    pass

# Update Schema
class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    learning_tip: Optional[str]
    reward: Optional[str]
    type: Optional[TaskType]

# Show Schema
class TaskShow(TaskBase):
    id: int
    lessons: List["LessonShow"]
    quiz: List["QuizShow"]

    class Config:
        from_attributes = True