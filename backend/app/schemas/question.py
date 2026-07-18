from pydantic import BaseModel


class InterviewQuestionResponse(BaseModel):
    id: int
    question_text: str
    category: str
    order_sequence: int

    model_config = {
        "from_attributes": True
    }