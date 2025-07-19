from openai import OpenAI
from app.schemas import Proposal
from dotenv import load_dotenv
import os

# Load .env from the parent directory of backend/
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', '.env'))


api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("❌ OPENAI_API_KEY not found in .env")

client = OpenAI(api_key=api_key)
MODEL = 'gpt-4'

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
    
    response = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=400
    )

    content = response.choices[0].message.content.strip()

    # Parse the content
    try:
        title = content.split("Title:")[1].split("Description:")[0].strip()
        description = content.split("Description:")[1].split("Rationale:")[0].strip()
        rationale = content.split("Rationale:")[1].strip()
    except IndexError:
        raise ValueError("Failed to parse response content:\n" + content)

    return Proposal(title=title, description=description, rationale=rationale)
