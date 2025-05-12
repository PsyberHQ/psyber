from pydantic import BaseModel, EmailStr,BeforeValidator,Field,AnyHttpUrl,AnyUrl
from typing import Optional,Annotated,Union,List,Literal
from app.utils.utils import hash_password
from app.schemas.wallet import WalletBase,WalletShow
# Base schema for User
class BaseUser(BaseModel):
    name:Optional[str] = None
    username:Annotated[str,Field(examples=['Admin'])]
    email: EmailStr
    
    

#!SECTION - Schema for User Signup
class UserSignup(BaseUser):
    password: Annotated[str,Field(examples=['admin']),BeforeValidator(hash_password)]

#!SECTION for showing User details
class UserShow(BaseUser):
    id: int
    is_active: bool = True
    image_url:Optional[Union[AnyUrl,AnyHttpUrl]]
    level:int
    xp:int
    wallets: Optional[List[Union[WalletBase,WalletShow]]] = []

    class Config:
        from_attributes = True

class UserUpdate(BaseUser):
    name:Optional[str] = None
    username:Annotated[Optional[str],Field(examples=['Admin'])]=None
    email: Optional[EmailStr] = None
    image_url:Optional[str] = None
    level:Optional[int] = None
    xp: Optional[int] = None
    wallets:Optional[List[WalletBase]] = None
        
#!SECTION File
class FileShow(BaseModel):
    file_url:str
    class Config:
        from_attributes = True
FileDir = Literal['profile','other']
        
        