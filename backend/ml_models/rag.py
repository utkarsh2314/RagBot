# pip install langchain langchain-community langchain-text-splitters pypdf langchain_google_genai transformers faiss-cpu
# pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv
from embedding import embedding



load_dotenv()

loader1 = PyPDFLoader("docs/Work From Home Structure.pdf")
loader2 = PyPDFLoader("docs/Leave Structure.pdf")
loader3 = PyPDFLoader("docs/Medical Conditions.pdf")

docs1 = loader1.load()
docs2 = loader2.load()
docs3 = loader3.load()

docs = docs1 + docs2 + docs3


splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,
    chunk_overlap=50,
)

chunks=splitter.split_documents(docs)
print(len(chunks))

vector_store = FAISS.from_documents(
    documents=chunks,
    embedding=embedding
)

vector_store.save_local("Store")

