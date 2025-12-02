from langchain_community.vectorstores import FAISS
from embedding import embedding


vector_store = FAISS.load_local(
    "Store",
    embedding,
    allow_dangerous_deserialization=True
)


for doc_id, doc in vector_store.docstore._dict.items():
        print(doc.metadata.get("source"))
        
num_vectors_langchain = vector_store.index.ntotal

print(num_vectors_langchain)