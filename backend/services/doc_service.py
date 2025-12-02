from fastapi import UploadFile,File
from ml_models.similarity_check import similarity
from ml_models.new_upload import add_vector_store
from ml_models.file_deletion import delete_file
import os
import re
from ml_models.embedding import embedding
from langchain_community.vectorstores import FAISS


async def upload_doc(file: UploadFile = File()):
    base, ext = os.path.splitext(file.filename)
    vector_store = FAISS.load_local(
    "Store",
    embedding,
    allow_dangerous_deserialization=True
    )
    existing_sources = [
        doc.metadata.get("source", "")
        for doc in vector_store.docstore._dict.values()
    ]

    # Regex to detect existing versions: file.pdf, file_v2.pdf, file_v3.pdf etc.
    pattern = re.compile(rf"{re.escape(base)}(?:_v(\d+))?{re.escape(ext)}$")

    version_numbers = []
    for src in existing_sources:
        match = pattern.search(src)
        if match:
            # match.group(1) is version number; None means original file (v1)
            version_numbers.append(int(match.group(1) or 1))

    # Determine next version number
    if version_numbers:
        next_version = max(version_numbers) + 1
        new_filename = f"{base}_v{next_version}{ext}"
    else:
        # First version
        new_filename = file.filename
    content = await file.read()
    save_path = f"docs/{new_filename}"
    with open(save_path, "wb") as f:
        f.write(content)
    # print("1")
    # print(file.filename)
    res=  similarity(new_filename)
    # print(res)
    filename = res["filename"]
    score = res["score"]
    # print("2")
    if(score>10):
        return add_vector_store(new_filename)
    else:
        return {"conflict":filename,"current":new_filename}


def del_prev_file(filename:str):
    return delete_file(filename)

def add_new_file(filename:str):
    return add_vector_store(filename)

