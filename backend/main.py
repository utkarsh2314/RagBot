from fastapi import FastAPI
from routers import chat,docs
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["new_access_token"]
)
DOCS_DIR = "docs/"    

@app.get("/docs/files/{filename}")
def get_file(filename: str):
    file_path = os.path.join(DOCS_DIR, filename)
    return FileResponse(file_path)

app.include_router(chat.router)
app.include_router(docs.router)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: str = None):
#     return {"item_id": item_id, "q": q}