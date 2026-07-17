from langchain_core.output_parsers import PydanticOutputParser

from ai.schemas.evaluation_schema import InterviewEvaluation
from ai.prompts.interview_evaluation import (
    INTERVIEW_EVALUATION_PROMPT,
)

from ai.llm import llm

parser = PydanticOutputParser(
    pydantic_object=InterviewEvaluation
)

prompt = INTERVIEW_EVALUATION_PROMPT.partial(
    format_instructions=parser.get_format_instructions()
)

chain = prompt | llm | parser

class InterviewEvaluator:
    @staticmethod
    def evaluate(interview,qa_pairs):
        conversation = ""

        for index,pair in enumerate(qa_pairs,start=-1):
            conversation += (
                f"Question {index}:\n"
                f"{pair['question']}\n\n"
                f"Answer:\n"
                f"{pair['answer']}\n\n"
            )
        
        return chain.invoke(
            {
                "position": interview.job_position,
                "level": interview.seniority_level,
                "conversation": conversation,
            }
        )