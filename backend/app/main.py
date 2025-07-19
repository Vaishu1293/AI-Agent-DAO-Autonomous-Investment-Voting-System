from fastapi import FastAPI
from app.schemas import Proposal
from app.agent import generate_proposal
from app.submitter import send_proposal_to_chain

app = FastAPI()
@app.get("/")
def root():
    return {"message": "AI Agent DAO backend is running."}

@app.get("/proposal", response_model=Proposal)
def get_proposal():
    proposal = generate_proposal()
    return proposal

@app.post("/proposal/send")
def generate_and_send():
    proposal = generate_proposal()
    tx_hash = send_proposal_to_chain(proposal.title, proposal.description)
    return {
        "title": proposal.title,
        "description": proposal.description,
        "rationale": proposal.rationale,
        "tx_hash": tx_hash
    }

