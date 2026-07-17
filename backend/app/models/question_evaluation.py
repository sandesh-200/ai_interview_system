from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from models.base import Base


class QuestionEvaluation(Base):
    __tablename__ = "question_evaluations"

    id = Column(Integer, primary_key=True)

    interview_evaluation_id = Column(
        Integer,
        ForeignKey(
            "interview_evaluations.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    answer_id = Column(
        Integer,
        ForeignKey(
            "answers.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        unique=True,
    )

    score = Column(
        Integer,
        nullable=False,
    )

    feedback = Column(
        Text,
        nullable=False,
    )

    interview_evaluation = relationship(
        "InterviewEvaluation",
    )

    answer = relationship(
        "Answer",
    )