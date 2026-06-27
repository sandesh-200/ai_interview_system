from models.question import Question
from sqlalchemy.orm import Session

class QuestionRepository:
    @staticmethod
    def create_many(
        db:Session,
        questions:list[dict],
    )->list[Question]:
        question_models = [
            Question(**question)
            for question in questions
        ]

        db.add_all(question_models)
        db.flush()
        return question_models