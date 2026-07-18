from pydantic import BaseModel


class QuestionEvaluationResponse(BaseModel):
    question: str
    answer: str
    score: int
    feedback: str


class InterviewEvaluationResponse(BaseModel):
    overall_score: int
    overall_feedback: str
    strengths: list[str]
    improvements: list[str]

    questions: list[QuestionEvaluationResponse]