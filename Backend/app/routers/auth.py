from fastapi import APIRouter,status,Request,HTTPException
from app.models.user import User
from app.schemas.user import UserSignup,UserShow
from app.core.dependencies import DBSession,PassWordRequestForm,TokenDependecy
from app.core.configs import logger
from app.services.auth import (
    create_user,
    authenticate_user,
    create_access_token,
    proccess_logout,
    google_auth,
    reset_password,
    oauth,)
from app.schemas.auth import Token,LoginData,PasswordReset,OtpSend,OtpSchema
from typing import Any
from app.utils.utils import token_exp_time,blacklist_token,verify_otp
from app.services.user import GetUser,ActiveUser,OtpVerification
from app.utils.email import create_send_otp


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

#!SECTION Google Auth
@router.get('/login-with-google')
async def login(request: Request):
    redirect_uri = request.url_for('auth')
    return await oauth.google.authorize_redirect(request, redirect_uri) # type: ignore

@router.get('/google/callback',response_model=Token)
async def auth(request: Request,db:DBSession) -> Token:
    user = await google_auth(request,db)
        # create a new access token
    access_token = await create_access_token(
        data={"sub": user.email}
    )
    return Token(access_token=access_token)

@router.put('/reset-password',status_code=status.HTTP_202_ACCEPTED,response_model=Token,description='Reset Password')
async def reset_pwd(current_user:ActiveUser,payload:PasswordReset,email:OtpVerification,db:DBSession):
    await reset_password(current_user,db,payload.password)
    token = await create_access_token(data={"sub": email})
    return Token(access_token=token)


@router.post('/send-otp',response_model=dict,status_code=status.HTTP_202_ACCEPTED)
async def send_otp(payload:OtpSend):
    otp_sent = await create_send_otp(payload.email)
    if not otp_sent:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Unable to send OTP'
        )
    return {'detail':'OTP sent'}
    
verify_otp_desc = '''Token returned from this endpoint is valid for only `5 minutes`
<h3><b>Once the OTP is verified the token is blacklisted</b></h3>
<b><i>These tokens carry a scope that allows only actions that need OTP verification therefore cannot be used elsewhere</i></b>'''

#NOTE - Verification Endpoint
@router.post('/verify-otp',response_model=Token,status_code=status.HTTP_200_OK,description=verify_otp_desc)
async def verify_otp_route(payload:OtpSchema):
    verified = await verify_otp(**payload.model_dump())
    if not verified:
        raise 
    scopes = ['otp']
    access_token = await create_access_token(
        data={"sub": payload.email,"scopes": scopes},expire_time=5
        )
    return Token(access_token=access_token)