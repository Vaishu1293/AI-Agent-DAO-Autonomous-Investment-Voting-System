import os
import openai
from dotenv import load_dotenv
from app.schemas import Proposal

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
MODEL = os.getenv("MODEL_NAME", "gpt-4")
def generate_proposal() -> Proposal:
    prompt = """
    You are a DeFi investment strategist AI. Based on current market trends, generate a proposal
    for the DAO.
    Include a clear title, detailed description, and strategic rationale.
    Format:
    Title: ...
    Description: ...
    Rationale: ...
    """
    response = openai.ChatCompletion.create(model=MODEL, messages=[{"role": "user", "content": prompt}], max_tokens=400)
    content = response.choices[0].message['content']
    # Simple text parse
    title = content.split("Title:")[1].split("Description:")[0].strip()
    description = content.split("Description:")[1].split("Rationale:")[0].strip()
    rationale = content.split("Rationale:")[1].strip()
    return Proposal(title=title, description=description, rationale=rationale)