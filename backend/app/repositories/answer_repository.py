from sqlalchemy.orm import Session
from models.answer import Answer

class AnswerRepository:
    @staticmethod
    def create(db:Session,session_id:int,question_id:int,answer_text:str):
        answer = Answer(
            session_id=session_id,
            question_id=question_id,
            answer_text = answer_text
        )

        db.add(answer)
        db.flush()

        return answer
    

    @staticmethod
    def get_by_session(
        db: Session,
        session_id: int,
    ):
        return (
            db.query(Answer)
            .filter(
                Answer.session_id == session_id
            )
            .order_by(
                Answer.submitted_at
            )
            .all()
        )
    