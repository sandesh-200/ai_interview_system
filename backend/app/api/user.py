from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import get_db
from typing import List

from services.user import (
    UserService,
    admin_required,
)

from schemas.user import CandidateResponse

from models.user import User

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

@router.get(
    "/candidates",
    response_model=List[CandidateResponse],
)
def get_candidates(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    return UserService.get_all_candidates(db)


@router.get(
    "/available-candidates/{interview_id}",
    response_model=List[CandidateResponse],
)
def get_available_candidates(
    interview_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    return UserService.get_available_candidates(
        db=db,
        interview_id=interview_id,
    )