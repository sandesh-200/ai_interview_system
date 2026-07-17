from typing import Literal

from pydantic import BaseModel,Field

class GeneratedQuestion(BaseModel):
    question_text:str = Field(description="Interview question")
    category:Literal["Technical","Behavioral","Situational"] = Field(description="Question category")

class GeneratedQuestionsList(BaseModel):
    questions:list[GeneratedQuestion]