import smtplib
#from email.mime.application import MIMEApplication
from email_lib import render_template,EmailSender
from random import randint
from datetime import timedelta
 
from app.core.configs import redis,VERIFICATION_CODE_EXP_MIN,EMAIL,EMAIL_HOST,APP_PASS, logger,otp_prefix,TEMPLATES
from app.core.dependencies import env

token_expiration = int(VERIFICATION_CODE_EXP_MIN.total_seconds()/60)

email_sender = EmailSender(
    smtp_host=EMAIL_HOST, # type: ignore
    smtp_user=EMAIL, # type: ignore
    smtp_pass=APP_PASS, # type: ignore
    from_email=EMAIL # type: ignore
)
        
async def create_send_otp(email:str,length:int = 4) -> int:
    otp= ''.join(str(randint(0, 9)) for _ in range(length))
    await redis.setex(otp_prefix.format(email),VERIFICATION_CODE_EXP_MIN,otp)
    logger.info(f'otp saved to redis for {token_expiration} minutes')
    otp_text = render_template(env,TEMPLATES['otp'],otp=otp,expiry=token_expiration,support_email=EMAIL)
    send_otp = await email_sender.send_email(text=otp_text,to_email=email,subject='OTP for Verification')
                                
    if send_otp:
        logger.info('OTP Sent')
        return True
    logger.error('Failed to send OTP')
    return False






    
    
    
        
    






