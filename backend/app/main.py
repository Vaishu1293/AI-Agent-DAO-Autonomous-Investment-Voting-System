from fastapi import FastAPI
from app.agent import generate_proposal
from app.schemas import Proposal

app = FastAPI()
@app.get("/")
def root():
    return {"message": "AI Agent DAO backend is running."}

@app.get("/proposal", response_model=Proposal)
def get_proposal():
    proposal = generate_proposal()
    return proposal
