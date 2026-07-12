from langchain_core.output_parsers import PydanticOutputParser

from ai.llm import llm
from ai.prompts.question_generation import (
    QUESTION_GENERATION_PROMPT,
)
from ai.schemas.question_schema import (
    GeneratedQuestionsList,
)

parser = PydanticOutputParser(
    pydantic_object=GeneratedQuestionsList
)

prompt = QUESTION_GENERATION_PROMPT.partial(
    format_instructions=parser.get_format_instructions()
)

chain = prompt | llm | parser


class QuestionGenerator:

    @staticmethod
    def generate(interview):

        result = chain.invoke(
            {
                "count": interview.max_questions,
                "position": interview.job_position,
                "level": interview.seniority_level,
            }
        )

        return result.questions