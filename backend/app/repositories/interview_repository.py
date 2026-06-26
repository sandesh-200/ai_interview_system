from sqlalchemy.orm import Session
from models.interview import Interview

class InterviewRepository:
    @staticmethod
    def create(db:Session,**kwargs):
        interview = Interview(**kwargs)

        db.add(interview)
        db.commit()
        db.refresh(interview)
        
        return interview
    
    @staticmethod
    def get_all(db:Session):
        return (
            db.query(Interview).order_by(Interview.created_at.desc()).all()
        )
    
    @staticmethod
    def get_by_id(
        db:Session,
        interview_id:int
    ):
        return(
            db.query(Interview).filter(Interview.id == interview_id).first()
        )
    
    
