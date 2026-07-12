from sqlalchemy.orm import Session

from models.interview_question import InterviewQuestion


class InterviewQuestionRepository:

    @staticmethod
    def create_many(
        db: Session,
        interview_id: int,
        questions,
    ):
        mappings = [
            InterviewQuestion(
                interview_id=interview_id,
                question_id=question.id,
                order_sequence=index + 1,
            )
            for index, question in enumerate(questions)
        ]

        db.add_all(mappings)

        db.flush()