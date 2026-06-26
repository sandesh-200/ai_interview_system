from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.interview import InterviewStatus
from repositories.interview_repository import InterviewRepository
from schemas.interview import InterviewCreate

class InterviewService:
    @staticmethod
    def create_interview(
        db:Session,
        data:InterviewCreate,
        admin_id:int
    ):
         return InterviewRepository.create(
            db=db,
            title=data.title,
            job_position=data.job_position,
            seniority_level=data.seniority_level,
            max_questions=data.max_questions,
            status=InterviewStatus.draft,
            created_by=admin_id,
        )
    
    @staticmethod
    def get_all_interviews(db:Session):
         return InterviewRepository.get_all(db)
    
    @staticmethod
    def get_interview(
        db:Session,
        interview_id:int):
            interview = InterviewRepository.get_by_id(db,interview_id)
            
            if not interview:
              raise HTTPException(
                   status_code=404,
                   detail="Interview not found"
              )
            return interview
