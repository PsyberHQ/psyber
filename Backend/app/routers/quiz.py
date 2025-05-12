from fastapi import APIRouter, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import DBSession
from app.schemas.quiz import SubmitQuizRequest,SubmitQuizResponse
from app.schemas.task import TaskShow
from app.services.quiz import submit_quiz
from app.services.task import full_task
from app.services.user import ActiveUser
from typing import List

router = APIRouter(prefix="/init-quiz", tags=["Quiz"])


@router.post("/submit",status_code=status.HTTP_200_OK,response_model=SubmitQuizResponse)
async def submit_init_quiz(current_user:ActiveUser,data: SubmitQuizRequest, db:DBSession):
    return await submit_quiz(current_user,data, db)

@router.get('/full-tasks',response_model=List[TaskShow],status_code=status.HTTP_200_OK)
async def get_full_task(current_user:ActiveUser,db:DBSession):
    return await full_task(db)

 