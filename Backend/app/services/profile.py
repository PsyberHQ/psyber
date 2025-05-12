import os,aiofiles
from pathlib import Path
from app.core.configs import Media_dir,logger
from fastapi import UploadFile,HTTPException,status
from typing import Literal
from app.models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.user import UserUpdate,FileDir
from sqlalchemy.exc import IntegrityError
from app.models.wallet import Wallet


async def upload_image(file:UploadFile,identifier,upload_dir:FileDir)->str:
    file_path = os.path.join(Media_dir,upload_dir,f'{identifier}{Path(file.filename).suffix}')    # type: ignore
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    async with aiofiles.open(file_path, "wb") as buffer:
        while chunk := await file.read(1024):  #NOTE  Read in chunks of 1KB
            await buffer.write(chunk)
    return file_path

async def update_user(update_data:UserUpdate,db:AsyncSession,user:User) -> User:
    update_fields = update_data.model_dump(exclude_unset=True,exclude_none = True)

    #NOTE -  Check for wallet data
    if update_data.wallets:
        user.wallets = [Wallet(**w.model_dump()) for w in update_data.wallets]
        update_fields.pop('wallets',None) #NOTE -  Remove the wallet field
        
    for key,value in update_fields.items():
        setattr(user,key,value)
    try:
        db.add(user)
        await db.commit()
        await db.refresh(user)
        return user
    except IntegrityError as e:
        logger.error(str(e))
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail = 'Could not update user,refresh token or switch to appropriate account type'
        )