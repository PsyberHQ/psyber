from fastapi import APIRouter,status
from app.models.user import User
from app.schemas.user import UserSignup,UserShow
from app.core.dependencies import DBSession,PassWordRequestForm,TokenDependecy
from app.services.auth import (
    create_user,
    authenticate_user,
    create_access_token,
    proccess_logout)
from app.schemas.auth import Token,LoginData
from typing import Any
from app.utils.utils import token_exp_time,blacklist_token
from app.services.user import GetUser,ActiveUser


router = APIRouter(prefix='/auth',tags=['Auth'])


@router.post('/signup',response_model=UserShow,status_code=status.HTTP_201_CREATED)
async def create_account(payload:UserSignup,DB:DBSession) -> User:
    return await create_user(payload,DB)

@router.post("/login",response_model=Token)
async def user_login(form_data: PassWordRequestForm) -> Token:
    login_data = LoginData(**form_data.__dict__)
    user:UserShow = await authenticate_user(login_data)
    access_token = await create_access_token(
        data={"sub": user.email}
        )
    return Token(access_token=access_token)

@router.post('/logout',status_code=status.HTTP_202_ACCEPTED)
async def logout(current_user:GetUser,token:TokenDependecy) -> dict[str, str]:# -> Any:
    return await proccess_logout(token)


token_refresh_desc ='''This endpoint refreshes a user's token including the neccesary permissions for the account type,in case of <b>unauthorized</b> or <b>account type changes</b>
The previous token will be `blacklisted`'''   


@router.put('/refresh-token',response_model=Token,status_code=status.HTTP_200_OK,description=token_refresh_desc)
async def refresh_token(current_user:ActiveUser,token:TokenDependecy) -> Token:
    token_exp = await token_exp_time(token) #type: ignore
    await blacklist_token(token,token_exp) # type: ignore
    new_token = await create_access_token(data={"sub": current_user.email})
    return Token(access_token=new_token)