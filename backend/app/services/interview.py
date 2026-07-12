from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.interview import InterviewStatus
from repositories.interview_repository import InterviewRepository
from schemas.interview import InterviewCreate,InterviewUpdate
from repositories.interview_question_repository import InterviewQuestionRepository
from repositories.question_repository import QuestionRepository
from ai.chains.question_generator import QuestionGenerator

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
    

    @staticmethod
    def update_interview(
        db: Session,interview_id: int,data: InterviewUpdate):
            interview = InterviewRepository.get_by_id(db,interview_id,)

            if not interview:
                raise HTTPException(
                status_code=404,
                detail="Interview not found")

            if interview.status != InterviewStatus.draft:
                raise HTTPException(
            status_code=400,
            detail="Only draft interviews can be updated.")

            update_data = data.model_dump(exclude_unset=True)

            return InterviewRepository.update(db,interview,update_data)
    
    @staticmethod
    def delete_interview(
    db: Session,
    interview_id: int):
        interview = InterviewRepository.get_by_id(
        db,
        interview_id)

        if not interview:
            raise HTTPException(
            status_code=404,
            detail="Interview not found",
        )

        if interview.status != InterviewStatus.draft:
            raise HTTPException(
            status_code=400,
            detail="Only draft interviews can be deleted.",
        )

        InterviewRepository.delete(
        db,
        interview)

    @staticmethod
    def generate_questions(
    db: Session,
    interview_id: int,
):
        interview = InterviewRepository.get_by_id(
        db,
        interview_id,
    )

        if not interview:
            raise HTTPException(
            status_code=404,
            detail="Interview not found",
        )

        if interview.status != InterviewStatus.draft:
            raise HTTPException(
            status_code=400,
            detail="Questions have already been generated for this interview.",
        )

        try:
            generated_questions = QuestionGenerator.generate(interview)

            question_payload = [
            {
        "question_text": q.question_text,
        "category": q.category,
        "is_ai_generated": True,
        "target_position": interview.job_position,
        "target_level": interview.seniority_level,
            }
    for q in generated_questions
]
            


            questions = QuestionRepository.create_many(
            db=db,
            questions=question_payload,
        )

        # 3. Link questions to interview
            InterviewQuestionRepository.create_many(
            db=db,
            interview_id=interview.id,
            questions=questions,
        )

        # 4. Update interview status
            InterviewRepository.update_status(
            db=db,
            interview=interview,
            status=InterviewStatus.ready,
        )

        # 5. Commit everything
            db.commit()

            db.refresh(interview)

            return {
            "message": "Questions generated successfully."
        }

        except Exception:
            db.rollback()
            raise   
