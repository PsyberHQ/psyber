from enum import Enum
from pydantic import BaseModel

class WalletType(str,Enum):
    primary = 'primary'
    secondary = 'secondary'
    
class ChainType(str,Enum):
    solana = 'solana'
    etherium = 'etherium'
    

#NOTE - Regex for Phone
PHONE_REGEX = r'^\+\d{10,15}$'


class ContentType(str, Enum):
    text = "text"
    image = "image"
    video = "video"

class TaskType(str, Enum):
    task_with_lesson_quiz = "task_with_lesson_quiz"
    task_with_image = "task_with_image"
    

class BadgeLevel(str, Enum):
    VISIONARY = "Visionary"
    ADVENTURER = "Adventurer"
    EXPLORER = "Explorer"
    BEGINNER = "Beginner"