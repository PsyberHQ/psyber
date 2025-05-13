import jwt
from jwt.exceptions import InvalidTokenError,ExpiredSignatureError
from app.core.configs import SECRET_KEY,ALGORITHM,redis,logger,BLACKLIST_PREFIX
from app.schemas.auth import TokenData
from app.services.auth import get_user
from fastapi import Depends,HTTPException,status,Security
from typing import Annotated
from fastapi.security import SecurityScopes
from pydantic import EmailStr
from app.utils.utils import blacklist_token,token_exp_time
from app.core.dependencies import TokenDependecy,DBSession,InvalidCredentialsException
from app.models.user import User

async def get_current_user(security_scopes:SecurityScopes,token:TokenDependecy) -> User:
    is_blacklisted = await redis.get(BLACKLIST_PREFIX.format(token))
    logger.info(f'Blacklisted: {bool(is_blacklisted)}')
    if is_blacklisted:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='Token has been revoked')
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = 'Bearer'
    try:
        payload:dict = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM]) # type: ignore
        identifier = payload.get('sub')
        logger.info(f'Identifier {identifier}')
        if not identifier:
            raise InvalidCredentialsException
    except (InvalidTokenError,ExpiredSignatureError):
        raise InvalidCredentialsException
    
    #NOTE ensure that OTP tokens are not used in this route
    '''if 'otp' in token_scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="OTP token not permitted in this route",
                headers={"WWW-Authenticate": authenticate_value},
            )'''
    token_data = TokenData(identifier=identifier)
    user = await get_user(token_data.identifier) # type: ignore
    logger.info(f'User {user.username} fetched')
    if not user:
        logger.error('User not found')
        raise InvalidCredentialsException
    #NOTE - Scopes
    for scope in security_scopes.scopes:
        if scope not in token_data.scopes: # type: ignore
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
    return user
    
GetUser = Annotated[User,Depends(get_current_user)]

async def get_current_active_user(current_user:GetUser) -> User:
    if not current_user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='Inactive User')
    return current_user

ActiveUser = Annotated[User,Depends(get_current_active_user)]

async def get_verified_otp_email(security_scopes:SecurityScopes,token:TokenDependecy):
    is_blacklisted = await redis.get(BLACKLIST_PREFIX.format(token))
    logger.info(f'Blacklisted {bool(is_blacklisted)}')
    if is_blacklisted:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='Token has been revoked')
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = 'Bearer'
    try:
        payload:dict = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM]) # type: ignore
        email = payload.get('sub')
        logger.info(f'OTP Email {email}')
        if not email:
            raise InvalidCredentialsException
    except (InvalidTokenError,ExpiredSignatureError):
        raise InvalidCredentialsException
    token_scopes = payload.get("scopes", [])
    
    for scope in security_scopes.scopes:
        if scope not in token_scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
    token_exp = await token_exp_time(token)
    await blacklist_token(token,token_exp) # type: ignore
    return email

OtpVerification = Annotated[EmailStr, Security(get_verified_otp_email, scopes=["otp"])]