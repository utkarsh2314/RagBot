from fastapi import APIRouter
from schema.chat_schema import ChatIn,ChatOut 
from services.chat_service import chat

router = APIRouter(
    prefix="/chat",
    tags=['Chat']
)


@router.post('/',response_model=ChatOut)
def chatting(request:ChatIn):
    return chat(request)
