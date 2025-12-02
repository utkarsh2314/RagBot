from ml_models.embedding import embedding
from langchain_community.vectorstores import FAISS
import os


def delete_file(file_name):
    ids = []
    vector_store = FAISS.load_local(
    "Store",
    embedding,
    allow_dangerous_deserialization=True
    )
    # print("delete FIle",file_name)
    for doc_id, doc in vector_store.docstore._dict.items():
        # print(doc.metadata.get("source")+"   "+file_name)
        if (doc.metadata.get("title") == f"{file_name}" or doc.metadata.get("source") == f"docs/{file_name}" ):
            # print(doc)
            # print("!!!!!!!")
            ids.append(doc_id)
    if(ids == []):
        # print("noo")
        return {"res": f"{file_name} does not exist"}
    vector_store.delete(ids)
    vector_store.save_local("Store")
    file_path =f"docs/{file_name}"
    # print("delete FIle",file_path)
    if os.path.exists(file_path):
        os.remove(file_path)
        # print(f"File '{file_path}' deleted successfully.")
    else:
        # print(f"File '{file_path}' does not exist.")
        pass
    
    return {"res": f"{file_name} is deleted"}