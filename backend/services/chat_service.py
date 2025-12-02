from ml_models.chatbot import chats
from schema.chat_schema import ChatIn

def chat(request:ChatIn):
    ques = request.ques
    context = request.context
    return chats(ques,context)
