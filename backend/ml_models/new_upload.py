from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from ml_models.embedding import embedding

splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,
    chunk_overlap=50,
)

def add_vector_store(filename):
    # Load FAISS vector store
    vector_store = FAISS.load_local(
        "Store",
        embedding,
        allow_dangerous_deserialization=True
    )

    new_loader = PyPDFLoader("docs/" + filename)
    new_docs = new_loader.load()

    for d in new_docs:
        d.metadata["source"] = f"docs/{filename}"

    new_chunks = splitter.split_documents(new_docs)
    vector_store.add_documents(new_chunks)
    vector_store.save_local("Store")

    return {"msg": f"{filename} added successfully"}
