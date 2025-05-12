from typing import Sequence, Tuple
from sqlalchemy import select
from sqlalchemy.engine.row import Row
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.task import Task


async def full_task(db:AsyncSession) -> Sequence[Row[Tuple[Task]]]:
    query = await db.execute(select(Task))
    result = query.all()
    return result
