from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import get_db
from services.user import admin_required
from models.user import User
from schemas.interview import (
    InterviewCreate,
    InterviewResponse,
)
from services.interview import InterviewService
from typing import List

router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"],
)


@router.post("",response_model=InterviewResponse,status_code=201)
def create_interview(
    data: InterviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    return InterviewService.create_interview(
        db=db,
        data=data,
        admin_id=current_user.id,
    )


@router.get("",response_model=List[InterviewResponse])
def get_all_interviews(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    return InterviewService.get_all_interviews(db)

@router.get("/{interview_id}", response_model=InterviewResponse)
def get_interview(
    interview_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    return InterviewService.get_interview(
        db=db,
        interview_id=interview_id,
    )