from pydantic import BaseModel, Field


class SubmitAnswerRequest(BaseModel):
    question_id: int
    answer_text: str = Field(min_length=1)