import os
import sys
from dotenv import load_dotenv

# Load .env from the parent directory before importing anything that depends on config
dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path)

from ai.llm import llm

print("Before")

response = llm.invoke("Say hello.")

print("After")
print(response)