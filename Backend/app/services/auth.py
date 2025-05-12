from app.models.user import User
from sqlalchemy.ext.asyncio import AsyncSession 
from app.schemas.user import UserSignup
from sqlalchemy.exc import IntegrityError
from app.core.configs import logger,ALGORITHM,SECRET_KEY,expire_delta,SERVER_METADATA_URL
from fastapi import HTTPException,status,Request
from datetime import datetime,timedelta,timezone
from email_validator import validate_email,EmailNotValidError
from app.core.database import AsyncSessionLocal
from sqlalchemy.future import select
from app.schemas.auth import LoginData
from app.core.dependencies import InvalidCredentialsException
from app.utils.utils import verify_password,token_exp_time,blacklist_token
import jwt
from jwt.exceptions import InvalidTokenError,ExpiredSignatureError
#NOTE - GOogle Auth
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config

async def check_user_exists(identifier:str,db:AsyncSession) -> bool:
    """Check if a user exists in the database based on email, phone, or username."""
    query = select(User).where(
        User.email == identifier
    )
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    return user or None

#SECTION - Create User
async def create_user(user_data:UserSignup,db:AsyncSession) -> User:
    new_user = User(**user_data.model_dump(exclude_unset=True,exclude_none=True))
    try:
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        return new_user
    except IntegrityError as e:
        logger.error(f'username or email already exists\n{e}')
        raise HTTPException(
            detail='Username or email already exists',
            status_code = status.HTTP_409_CONFLICT
        )


#SECTION - Validate user identifier
class GetUser:
    def __init__(self, identifier: str) -> None:
        #self.db = db
        self.identifier = identifier

    def __check_email(self) -> bool:
        """Check if the identifier is a valid email."""
        try:
            validate_email(self.identifier, check_deliverability=False)
            return True
        except EmailNotValidError:
            return False


    async def get_user(self) -> User:
        """Fetch a user based on email, phone, or username and account type."""
        async with AsyncSessionLocal() as db:
            query = select(User)

            if self.__check_email():
                query = query.where(
                    User.email == self.identifier
                    )
            else:
                query = query.where(
                    User.username == self.identifier)
            
            result = await db.execute(query)
            user = result.scalar_one_or_none() 
            if user:
                await db.refresh(user)
                return user
        logger.info('User not found')
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail='User not found'
        )
                
#!SECTION Get User
async def get_user(identifier:str)->User:
    user_fetcher = GetUser(identifier)
    user = await user_fetcher.get_user()
    return user

#SECTION - Verify User data
async def authenticate_user(login_data:LoginData) -> User:
    user:User= await get_user(login_data.username)
    if not user:
        raise InvalidCredentialsException
    if not verify_password(login_data.password,user.password): # type: ignore
        raise InvalidCredentialsException
    return user

#!SECTION TOken creation
async def create_access_token(data:dict,expire_time=None) -> str:
    expiration = timedelta(minutes=expire_time) if expire_time else expire_delta
    to_encode = data.copy()
    expire = datetime.now(timezone.utc)+ expiration
    to_encode.update({'exp':expire})
    encoded_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM) # type: ignore
    return encoded_jwt

#SECTION - Process logout
async def proccess_logout(token:str) -> dict[str, str]:
    try:
        remaining_time = await token_exp_time(token) # type: ignore
        if not remaining_time:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")
        
        await blacklist_token(token,remaining_time) # type: ignore
    except (InvalidTokenError,ExpiredSignatureError):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")
    return {'message':'Logged out'}

#SECTION - Reset password
async def reset_password(user:User,db:AsyncSession,new_password:str):
    user.password = new_password
    db.add(user) 
    await db.commit()
    await db.refresh(user)
    return True
    
#SECTION - Google Auth

config = Config('.env')  # read config from .env file
oauth = OAuth(config)
oauth.register(
    name='google',
    server_metadata_url=SERVER_METADATA_URL,
    client_kwargs={
        'scope': 'openid email profile'
    }
)

async def google_auth(request:Request,db:AsyncSession) -> User:
    # get the user info from google
    try:
        token = await oauth.google.authorize_access_token(request) # type: ignore
        google_user_info = token['userinfo']
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        ) 
    user:User = await check_user_exists(google_user_info['email'],db) # type: ignore
    if not user:
        # create a new user
        new_user = UserSignup(
            email=google_user_info['email'],
            username=google_user_info['given_name'],
            name=google_user_info['name'],
            image_url=google_user_info['picture'] # type: ignore
        )
        user = await create_user(new_user, db)
    # update the existing user
    else:
        if not user.image_url:
            user.image_url = google_user_info['picture']
            db.add(user)
            await db.commit()
            await db.refresh(user)
    return user
        