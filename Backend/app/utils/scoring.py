from typing import List
from app.schemas.quiz import AnswerSchema
from app.models.quiz import InitQuizQuestion


def calculate_score(answers: List[AnswerSchema], questions: List[InitQuizQuestion]) -> int:
    total = 0
    question_map = {q.id: q for q in questions}

    for ans in answers:
        question = question_map.get(ans.id,0)
        if not question:
            continue
        selected_option = next((opt for opt in question.options if opt.text == ans.answer), None) # type: ignore
        if selected_option:
            total += selected_option.points
    return total
