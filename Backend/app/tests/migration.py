from email.mime import image
from pymongo import MongoClient
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from app.models.quiz import InitQuizQuestion, InitQuizResult  # adjust path if needed
from datetime import datetime
import json
from app.models.task import Task, Lesson, Content, Quiz, Option  # Adjust if your model path differs
from app.schemas.enums import ContentType, TaskType
from app.core.database import AsyncSessionLocal
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.configs import logger,MONGO_URI

# === 1. MongoDB Setup ===
MONGO_DB_NAME = "psyber"

client = MongoClient(MONGO_URI)
mongo_db = client[MONGO_DB_NAME]

questions_col = mongo_db["initquizquestions"]
results_col = mongo_db["initquizresults"]
collection = mongo_db["fulltasks"]

# === 2. SQLAlchemy Setup ===


# === 3. Migrate InitQuizQuestions ===
async def migrate_questions(session:AsyncSession):
    for doc in questions_col.find():
        cleaned_options = []
        for option in doc["options"]:
            option.pop("_id", None)  # Safely remove the _id field if it exists
            cleaned_options.append(option)
        question = InitQuizQuestion(
            question=doc["question"],
            options=cleaned_options,
        )
        session.add(question)
    logger.info("✅ Quiz questions migrated")

# === 4. Migrate InitQuizResults ===
def migrate_results(session:AsyncSession):
    for doc in results_col.find():
        user_id = doc.get("userId")
        if not user_id:
            continue
        result = InitQuizResult(
            user_id=int(str(user_id)),  # Ensure this maps to existing user IDs in SQL DB
            score=doc["score"],
            badge=doc["badge"],
            created_at=doc.get("createdAt", datetime.now())
        )
        session.add(result)
    logger.info("✅ Quiz results migrated")
    
    
# migrate_data.py




def map_content_type(value: str) -> ContentType:
    return ContentType(value)

def map_task_type(value: str) -> TaskType:
    value = TaskType.task_with_lesson_quiz if value == "TaskWithLessonQuiz" else TaskType.task_with_image
    return TaskType(value)

async def migrate_full_task(session:AsyncSession):
    for mongo_task in collection.find():
        # Create Task
        task = Task(
            title=mongo_task["title"],
            description=mongo_task["description"],
            learning_tip=mongo_task["learningTip"],
            reward=mongo_task["reward"],
            type=map_task_type(mongo_task["type"]),
        )
        session.add(task)
        await session.flush()  # Get task.id for FK use

        # Add Lessons
        for lesson_data in mongo_task.get("lessons", []):
            lesson = Lesson(
                title=lesson_data["title"],
                special_image=lesson_data.get("specialImage"),
                task_id=task.id,
            )
            session.add(lesson)
            await session.flush()

            for content_data in lesson_data.get("content", []):
                heading = content_data.get("heading")
                content = content_data.get("content")
                image = content_data.get("image")
                if content and heading:
                    content_table = Content(
                            type=map_content_type(content_data["type"]),
                            heading=heading,
                            content=content,
                            image=image,
                            lesson_id=lesson.id,
                        )

                    session.add(content_table)

        
        # Add Quiz (optional)
        for quiz_data in mongo_task.get("quiz", []):
            quiz = Quiz(
                question=quiz_data["question"],
                task_id=task.id,
                correct_option_id=1,  # Placeholder, will be updated later
            )
            session.add(quiz)
            await session.flush()

            local_id_to_db_id = {}
            for option_data in quiz_data.get("options", []):
                option = Option(
                    content=option_data["content"],
                    quiz_id=quiz.id,
                )
                session.add(option)
                await session.flush()
                
                local_id_to_db_id[option_data["id"]] = option.id
                
            correct_local_id = quiz_data["correctAnswer"]
            quiz.correct_option_id = local_id_to_db_id.get(correct_local_id) # type: ignore
            if quiz.correct_option_id is None:
                raise ValueError(f"Could not find correct answer for quiz: {quiz_data['question']}")

    await session.commit()




# === 5. Run and Commit ===
async def main():
    async with AsyncSessionLocal() as session:
        try:
            await migrate_questions(session)
            #migrate_results()
            await migrate_full_task(session)
            await session.commit()
            logger.info("🎉 Migration successful.")
        except Exception as e:
            await session.rollback()
            logger.error(f"❌ Error: {e}")
        finally:
            await session.close()

