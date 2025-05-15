from typing import List
from sqlalchemy import select
from sqlalchemy.engine.row import Row
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.task import Task


async def full_task(db:AsyncSession) -> List[Task]:
    query = await db.execute(select(Task))
    result = query.scalars().all()
    return result # type: ignore
