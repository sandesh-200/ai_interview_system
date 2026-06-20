from sqlalchemy import Column, Integer, String, Text, Boolean
from models.base import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)

    question_text = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)

    is_ai_generated = Column(Boolean, default=False)

    target_position = Column(String(100), nullable=True)
    target_level = Column(String(50), nullable=True)