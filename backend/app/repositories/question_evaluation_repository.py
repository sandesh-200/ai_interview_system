from sqlalchemy.orm import Session

from models.question_evaluation import QuestionEvaluation


class QuestionEvaluationRepository:

    @staticmethod
    def create_many(
        db: Session,
        interview_evaluation_id: int,
        evaluations: list[dict],
    ):
        models = [
            QuestionEvaluation(
                interview_evaluation_id=interview_evaluation_id,
                answer_id=item["answer_id"],
                score=item["score"],
                feedback=item["feedback"],
            )
            for item in evaluations
        ]

        db.add_all(models)
        db.flush()

        return models
    
    @staticmethod
    def get_by_interview_evaluation(
    db: Session,
    interview_evaluation_id: int,
):
        return (
        db.query(QuestionEvaluation)
        .filter(
            QuestionEvaluation.interview_evaluation_id
            == interview_evaluation_id
        )
        .all()
    )