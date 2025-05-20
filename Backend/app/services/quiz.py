from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.models.quiz import InitQuizResult, InitQuizQuestion
from app.schemas.quiz import SubmitQuizRequest,SubmitQuizResponse
from app.utils.scoring import calculate_score
from sqlalchemy import select
from fastapi import HTTPException
from app.schemas.enums import BadgeLevel



async def submit_quiz(user:User,data: SubmitQuizRequest, db: AsyncSession) -> SubmitQuizResponse:

    if user.badge:
        raise HTTPException(status_code=400, detail="User has already completed the quiz")

    result = await db.scalars(select(InitQuizQuestion).order_by(InitQuizQuestion.id))
    questions = result.all()

    score = calculate_score(data.answers, questions) # type: ignore

    badge = (
        BadgeLevel.VISIONARY if score == 20
        else BadgeLevel.ADVENTURER if score >= 15
        else BadgeLevel.EXPLORER if score >= 10
        else BadgeLevel.BEGINNER
    )

    new_result = InitQuizResult(user_id=user.id, score=score, badge=badge)

    user.badge = badge
    db.add(new_result)
    await db.commit()
    await db.refresh(user)
    return SubmitQuizResponse(user_id=user.id,badge=badge)

async def load_quiz(db:AsyncSession):
    result = await db.scalars(select(InitQuizQuestion).order_by(InitQuizQuestion.id))
    questions = result.all()
    return questions