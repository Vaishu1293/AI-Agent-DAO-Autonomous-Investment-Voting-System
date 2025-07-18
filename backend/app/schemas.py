from pydantic import BaseModel
class Proposal(BaseModel):
    title: str
    description: str
    rationale: str
