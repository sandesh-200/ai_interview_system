from sqlalchemy.orm import Session

from models.interview_candidate import InterviewCandidate

class InterviewSessionRepository:
    @staticmethod
    def create(db:Session,interview_id:int,candidate_id:int,current_interview_question_id:int)->InterviewCandidate:
        session = InterviewCandidate(interview_id=interview_id,candidate_id=candidate_id,current_interview_question_id=current_interview_question_id)
        db.add(session)
        db.flush()

        return session
    
    @staticmethod
    def get_by_id(db:Session,session_id:int):
        return (
            db.query(InterviewCandidate).filter(InterviewCandidate.id == session_id).first()
        )
    
    @staticmethod
    def get_by_interview_and_candidate(db:Session,interview_id:int,candidate_id:int):
        return (db.query(InterviewCandidate).filter(InterviewCandidate.interview_id==interview_id,InterviewCandidate.candidate_id==candidate_id).first())
    
    @staticmethod
    def update(
    db: Session,
    session,
):
        db.add(session)
        db.flush()

        return session