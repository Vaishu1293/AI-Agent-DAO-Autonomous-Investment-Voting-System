import os
from fastapi import FastAPI, Header, HTTPException, Depends
from dotenv import load_dotenv
from app.schemas import Proposal
from app.agent import generate_proposal
from app.submitter import send_proposal_to_chain
from bot.notifier import send_telegram_message

# Load .env from the parent directory of backend/
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', '.env'))

app = FastAPI()

# Dependency for API key verification
async def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != os.getenv("PROTECTED_API_KEY"):
        raise HTTPException(status_code=403, detail="Unauthorized")

# Public root route
@app.get("/")
def root():
    return {"message": "AI Agent DAO backend is running."}

# Protected: GET /proposal
@app.get("/proposal", response_model=Proposal)
def get_proposal(api_key: str = Depends(verify_api_key)):
    proposal = generate_proposal()
    return proposal

# Protected: POST /proposal/send
@app.post("/proposal/send")
def generate_and_send(api_key: str = Depends(verify_api_key)):
    proposal = generate_proposal()
    print(proposal)
    tx_hash = send_proposal_to_chain(proposal.title, proposal.description)
    send_telegram_message(f"📢 New Proposal:\n📝 {proposal.title}\n{proposal.description}\nTX: {tx_hash}")

    return {
        "title": proposal.title,
        "description": proposal.description,
        "rationale": proposal.rationale,
        "tx_hash": tx_hash
    }
