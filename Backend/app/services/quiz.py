from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.models.quiz import InitQuizResult, InitQuizQuestion
from app.schemas.quiz import SubmitQuizRequest,SubmitQuizResponse
from app.utils.scoring import calculate_score
from sqlalchemy import select
from fastapi import HTTPException
from app.schemas.enums import BadgeLevel



async def submit_quiz(user:User,data: SubmitQuizRequest, db: AsyncSession) -> SubmitQuizResponse: # type: ignore
    user:User = await db.get(User, user.id)  # Fixes the session-binding error


    '''if user.badge:
        raise HTTPException(status_code=400, detail="User has already completed the quiz")'''

    result = await db.scalars(select(InitQuizQuestion).order_by(InitQuizQuestion.id))
    questions = result.all()

    score = calculate_score(data.answers, questions) # type: ignore

    badge = (
        BadgeLevel.VISIONARY if score == 20
        else BadgeLevel.ADVENTURER if score >= 15
        else BadgeLevel.EXPLORER if score >= 10
        else BadgeLevel.BEGINNER
    )
    existing_result = await db.scalar(
        select(InitQuizResult).where(InitQuizResult.user_id == user.id) # type: ignore
    )

    result = existing_result or InitQuizResult(user_id=user.id, score=score, badge=badge) # type: ignore

    if existing_result:
        result.score = score
        result.badge = badge

    user.badge = badge # type: ignore
    db.add(result)
    await db.commit()
    await db.refresh(user)
    return SubmitQuizResponse(user_id=user.id,badge=badge) # type: ignore

async def load_quiz(db:AsyncSession):
    result = await db.scalars(select(InitQuizQuestion).order_by(InitQuizQuestion.id))
    questions = result.all()
    return questions