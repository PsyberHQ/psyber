from pydantic import BaseModel, EmailStr,BeforeValidator,Field,AnyHttpUrl,AnyUrl,model_validator
from typing import Optional,Annotated,Union,List,Literal,Self
from app.utils.utils import hash_password
from app.schemas.wallet import WalletBase,WalletShow
from app.schemas.quiz import InitQuizResultShow
# Base schema for User
class BaseUser(BaseModel):
    name:Optional[str] = None
    username:Annotated[str,Field(examples=['Admin'])]
    email: EmailStr
    
    

#!SECTION - Schema for User Signup
class UserSignup(BaseUser):
    password: Annotated[Optional[str],Field(examples=['admin']),BeforeValidator(hash_password)] = None
    image_url:Optional[Union[AnyUrl,AnyHttpUrl,str]] = None

#!SECTION for showing User details
class UserShow(BaseUser):
    id: int
    is_active: bool = True
    image_url:Optional[Union[AnyUrl,AnyHttpUrl]]
    level:int
    xp:int
    wallet: Optional[WalletShow] = None
    init_quiz_result:Optional[InitQuizResultShow] = Field(default=None, exclude=True)
    is_onboarded:bool = False
    
    @model_validator(mode='after')
    def set_is_onboarder(self) -> Self:
        if self.init_quiz_result:
            self.is_onboarded = True
        return self

    class Config:
        from_attributes = True

class UserUpdate(BaseUser):
    name:Optional[str] = None
    username:Annotated[Optional[str],Field(examples=['Admin'])]=None
    email: Optional[EmailStr] = None
    image_url:Optional[str] = None
    level:Optional[int] = None
    xp: Optional[int] = None
    wallet:Optional[WalletBase] = None
        
#!SECTION File
class FileShow(BaseModel):
    file_url:str
    class Config:
        from_attributes = True
FileDir = Literal['profile','other']
        
        