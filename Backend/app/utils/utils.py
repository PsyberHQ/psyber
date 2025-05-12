from app.core.configs import pwd_context,logger,redis,user_data_prefix,otp_prefix,BLACKLIST_PREFIX,logger,SECRET_KEY,ALGORITHM
import jwt
from typing import Any,List
from datetime import datetime,timezone
from pydantic import AnyUrl

def decode_url(url:AnyUrl)->str:
    return str(url)

def hash_password(password:Any)->str:
    return pwd_context.hash(password)


def verify_password(password:Any,password_hash:str)->bool:
    return pwd_context.verify(password,password_hash)


async def verify_otp(otp:str,email:str):
    stored_otp = await redis.get(otp_prefix.format(email))
    if stored_otp and stored_otp.decode() == otp:
        logger.info(f'otp verified')
        await redis.delete(otp_prefix.format(email))
        logger.info(f'{email} OTP Data deleted from redis')
        return True
    logger.error('OTP not found')
    return False

async def blacklist_token(token:str,time:int):
    await redis.setex(BLACKLIST_PREFIX.format(token),time,'blacklisted')
    logger.info(f'Token added to blacklist for {time/60} minutes')
    
async def token_exp_time(token:str):
    payload = jwt.decode(token,SECRET_KEY, algorithms=[ALGORITHM]) # type: ignore
    exp_timestamp = payload.get("exp")
    logger.info(f'Exp timestamp {exp_timestamp}')
    if not exp_timestamp:
        return None
    current_time = datetime.now(timezone.utc).timestamp()
    remaining_time = max(0, int(exp_timestamp - current_time))
    return remaining_time

    