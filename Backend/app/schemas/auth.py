from pydantic import BaseModel,EmailStr
from typing import Optional,Union,List

class TokenData(BaseModel):
    identifier:Optional[Union[str,EmailStr]]
    scopes:Optional[List[Union[str,None]]] = []
    
class Token(BaseModel):
    access_token:str
    token_type:Optional[str] = 'Bearer'
    
    
    
class LoginData(BaseModel):
    username:Union[EmailStr,str]
    password:str