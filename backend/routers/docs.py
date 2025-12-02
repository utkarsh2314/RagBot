from fastapi import APIRouter, File, Form, UploadFile
from services.doc_service import upload_doc,del_prev_file,add_new_file

router = APIRouter(
    prefix="/docs",
    tags=['Docs']
)


@router.post("/")
async def upload(file: UploadFile = File(...)):
    return await upload_doc(file)

@router.post("/delete/")
def delete(filename: str = Form(...)):
    # print(filename)
    return del_prev_file(filename)

@router.post("/upload/")
def delete(filename: str = Form(...)):
    # print(filename)
    return add_new_file(filename)