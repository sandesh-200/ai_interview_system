from sqlalchemy import Column, Integer, Enum, TIMESTAMP, ForeignKey, func
from sqlalchemy.orm import relationship
from models.base import Base
import enum


class CandidateStatus(str, enum.Enum):
    invited = "invited"
    enrolled = "enrolled"
    completed = "completed"
    scored = "scored"


class InterviewCandidate(Base):
    __tablename__ = "interview_candidates"

    id = Column(Integer, primary_key=True)

    interview_id = Column(Integer, ForeignKey("interviews.id", ondelete="CASCADE"))
    candidate_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    status = Column(Enum(CandidateStatus), default=CandidateStatus.invited)

    enrolled_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    completed_at = Column(TIMESTAMP(timezone=True), nullable=True)

    interview = relationship("Interview")
    candidate = relationship("User")