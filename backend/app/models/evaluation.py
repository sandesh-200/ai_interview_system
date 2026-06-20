from sqlalchemy import Column, Integer, Text, TIMESTAMP, ForeignKey, func, String
from sqlalchemy.orm import relationship
from models.base import Base


class Evaluation(Base):
    __tablename__ = "evaluations"

    id = Column(Integer, primary_key=True)

    answer_id = Column(Integer, ForeignKey("answers.id", ondelete="CASCADE"), unique=True)

    score_value = Column(Integer, nullable=False)
    feedback_text = Column(Text, nullable=False)

    evaluator_model = Column(String(100), nullable=False)

    evaluated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    answer = relationship("Answer")