from pydantic import BaseModel, Field


class QuestionEvaluation(BaseModel):
    question: str = Field(description="Interview question")
    answer: str = Field(description="Candidate answer")
    score: int = Field(ge=1, le=10)
    feedback: str


class InterviewEvaluation(BaseModel):
    overall_score: int = Field(ge=1, le=10)
    overall_feedback: str
    strengths: list[str]
    improvements: list[str]
    evaluations: list[QuestionEvaluation]