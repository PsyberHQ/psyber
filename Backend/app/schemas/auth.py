from pydantic import BaseModel,EmailStr,BeforeValidator,Field
from typing import Optional,Union,List,Annotated
from app.utils.utils import hash_password

class TokenData(BaseModel):
    identifier:Optional[Union[str,EmailStr]]
    scopes:Optional[List[Union[str,None]]] = []
    
class Token(BaseModel):
    access_token:str
    token_type:Optional[str] = 'Bearer'
    
    
    
class LoginData(BaseModel):
    username:Union[EmailStr,str]
    password:str
    
class PasswordReset(BaseModel):
    password:Annotated[str,BeforeValidator(hash_password),Field(examples=['admin'])]
    
class OtpSend(BaseModel):
    email:Annotated[EmailStr,Field(examples=['penivera655@gmail.com'])]
    
class OtpSchema(BaseModel):
    email:Annotated[EmailStr,Field(examples=['penivera655@gmail.com'])]
    otp:Union[str,int]
    
    