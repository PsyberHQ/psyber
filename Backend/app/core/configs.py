import  logging
from dotenv import load_dotenv
import os
from passlib.context import CryptContext
from datetime import timedelta
import logging
import redis.asyncio as aioredis
load_dotenv()

class ColoredFormatter(logging.Formatter):
    COLORS = {
        "DEBUG": "\033[94m",   #NOTE Blue
        "INFO": "\033[92m",    #NOTE  Green 
        "WARNING": "\033[93m", #NOTE Yellow
        "ERROR": "\033[91m",   #NOTE Red
        "CRITICAL": "\033[1;91m", # Bold Red
    }
    RESET = "\033[0m"

    def format(self, record):
        log_color = self.COLORS.get(record.levelname, self.RESET)
        record.levelname = f"{log_color}{record.levelname}{self.RESET}"
        return super().format(record)

# Configure logger
logger = logging.getLogger("colored_logger")
logger.setLevel(logging.DEBUG)

# Create handler
handler = logging.StreamHandler()
handler.setFormatter(ColoredFormatter("%(levelname)s:     %(funcName)s:Line-%(lineno)d: %(message)s"))

# Add handler to logger
logger.addHandler(handler)




SIGN_UP_DESC ='''Once accounts are created they are stored temporarily for 2 hours before deletion if email verification is not completed
'''



#NOTE - Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
expire_delta = timedelta(days=30)

#NOTE - Debug mode
DEBUG_MODE = os.getenv('DEBUG_MODE')== 'True' 

#NOTE - DB configs
REDIS_URL = os.getenv('REDIS_URL')
redis = aioredis.from_url(REDIS_URL)
VERIFICATION_CODE_EXP_MIN = timedelta(minutes=int(os.getenv('VERIFICATION_CODE_EXP_MIN'))) # type: ignore
DB_URL:str = os.getenv('DB_URL') # type: ignore
DEPLOYED_URL:str = os.getenv('DEPLOYED_URL') # type: ignore


#NOTE - Redis variables
BLACKLIST_PREFIX = 'blacklist:{}'
user_data_prefix='user_data:{}' 
otp_prefix = 'otp:{}'


#NOTE -  Templates Dir
Templates_dir = os.path.join(os.getcwd(),'app','templates')

#NOTE - Media dir

Media_dir = os.path.join(os.getcwd(),'media')
os.makedirs(Media_dir,exist_ok=True)


#NOTE - Middleware
origins = ['*',]

#NOTE - Templates
TEMPLATES = {
    "otp": "otp_email.txt",
    "welcome": "welcome_email.txt",
    "reset_password": "reset_password.txt",
}

#SECTION Google Auth
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
GOOGLE_REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI')
SERVER_METADATA_URL = os.getenv('SERVER_METADATA_URL')

#NOTE - Email
EMAIL = os.getenv('EMAIL')
EMAIL_HOST = os.getenv('EMAIL_HOST')
APP_PASS = os.getenv('APP_PASS')
EMAIL_PORT = os.getenv('EMAIL_PORT')