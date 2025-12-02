from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from collections import defaultdict
import numpy as np
from ml_models.embedding import embedding



def similarity(filename:str):
    vector_store = FAISS.load_local(
    "Store",
    embedding,
    allow_dangerous_deserialization=True    
    )
    loader = PyPDFLoader(f"docs/{filename}")

    new_doc = loader.load() 
    text = ''
    for i in new_doc:
        text+=i.page_content

    results_with_scores = vector_store.similarity_search_with_score(text,k=10)
    scores = defaultdict(list)

    for doc, val in results_with_scores:
        key = doc.metadata.get("source")
        scores[key].append(float(val))

    pdf = max(scores, key=lambda k: len(scores[k]))
    
    # print(pdf[5:], len(scores[pdf]), np.mean(scores[pdf]))
    return {"filename":pdf[5:],"score": np.mean(scores[pdf])}
