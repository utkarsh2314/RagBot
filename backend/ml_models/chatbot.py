from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from ml_models.embedding import embedding
from dotenv import load_dotenv

load_dotenv()

model= ChatGoogleGenerativeAI(model='gemini-2.5-flash')

def chats(ques,context):
  vector_store = FAISS.load_local(
    "Store",
    embedding,
    allow_dangerous_deserialization=True
  )

  retriever = vector_store.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 10, "lambda_mult": 0.8}
  )
  retriever_text = retriever.invoke(ques)
  prompt_temp= PromptTemplate(
    template = """
   Act as the experienced Lead Nurturance Officer and make your response polite,empathetic and aligned with company tone.

Your task is to answer the user's question strictly based on:
1. The provided policy text: {retriever_text}
2. The previous chat history: {context}

User Question:
{ques}

Guidelines:
- If the information needed to answer the question is present in the policy text or previous chats, provide a clear and accurate answer.
- Do NOT add any information that is not explicitly mentioned in the given text.
- DO basic courtesy for greetings, NO need to explicitly mention that it is not available in the policy text or previous chats.
- If the answer cannot be found in the policy text or previous chats, respond with:
  "This information is not mentioned in the given policies." and 
  then reply with most appropriate answer while telling but this is what you have found through general cases.

    """,
    input_variables=["ques","retriever_text","context"]
    )
  prompt= prompt_temp.invoke({"ques":ques,"retriever_text":retriever_text,"context":context})
  result= model.invoke(prompt)
  return {"response":result.content}

