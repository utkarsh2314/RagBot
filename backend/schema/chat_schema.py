from pydantic import BaseModel
from typing import Optional


class ChatIn(BaseModel):
    ques : str
    context: Optional[str]

class ChatOut(BaseModel):
    response : str

