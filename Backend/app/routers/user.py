from fastapi import APIRouter,status,UploadFile,File
from app.services.profile import upload_image
from app.services.user import ActiveUser
from app.schemas.user import FileShow,UserShow,UserUpdate,FileDir
from app.core.dependencies import FileUploadException,DBSession
from app.services.profile import update_user



router = APIRouter(tags=['User'],prefix='/user',)

#NOTE - Upload Profile Picture
@router.put('/file-upload/{type}',response_model=FileShow,description='Add max size 500kb - 2MB',status_code=status.HTTP_202_ACCEPTED)
async def upload_file(type:FileDir,current_user:ActiveUser,file: UploadFile = File(...)):
    if not file.filename:
        raise FileUploadException
    file_url = await upload_image(file,current_user.email,type)
    return FileShow(file_url=file_url)


#NOTE -  Get the current user data
@router.get('/me',response_model=UserShow,description='Get Current User Profile',status_code=status.HTTP_200_OK)
async def get_me(current_user:ActiveUser):
    return current_user

update_desc='''pick the target field and exclude the rest,
the server will dynamically update,all fields are optional'''
#NOTE - Update User Profile
@router.put('/update/me',response_model=UserUpdate,description=update_desc,status_code=status.HTTP_202_ACCEPTED)
async def update_me(current_user:ActiveUser,update_data:UserUpdate,db:DBSession) -> ActiveUser:
    return await update_user(update_data,db,current_user)


#NOTE - Delete
@router.delete('/delete-accnt',status_code=status.HTTP_202_ACCEPTED,response_model=dict)
async def delete_account(current_user:ActiveUser,db:DBSession) -> dict[str, str]:
    current_user.is_active =False
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)
    return {'message':'user deleted'}
    
