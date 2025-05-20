import dbm
from fastapi import APIRouter, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.quiz import InitQuizQuestion
from app.core.dependencies import DBSession
from app.schemas.quiz import SubmitQuizRequest,SubmitQuizResponse,InitQuizQuestionShow
from app.schemas.task import TaskShow
from app.services.quiz import submit_quiz,load_quiz
from app.services.task import full_task
from app.services.user import ActiveUser
from typing import List, Sequence

router = APIRouter(tags=["Quiz"])


@router.post("/init-quiz",status_code=status.HTTP_200_OK,response_model=SubmitQuizResponse)
async def submit_init_quiz(current_user:ActiveUser,data: SubmitQuizRequest, db:DBSession):
    return await submit_quiz(current_user,data, db)

@router.get('/full-tasks',response_model=List[TaskShow],status_code=status.HTTP_200_OK)
async def get_full_task(current_user:ActiveUser,db:DBSession):
    return await full_task(db)

@router.get('/init-quiz',response_model=List[InitQuizQuestionShow],status_code=status.HTTP_200_OK)
async def get_quiz_questions(current_user:ActiveUser,db:DBSession) -> Sequence[InitQuizQuestion]:
    return await load_quiz(db)
 