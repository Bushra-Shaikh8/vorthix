from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from utils.storage import save_faq_chunks, chunk_text, get_business
from utils.pdf import extract_text_from_pdf

router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("/{business_slug}")
async def upload_faq(
    business_slug: str,
    file: UploadFile = File(...),
    type: str = Form("text"),
):
    biz = get_business(business_slug)
    if not biz:
        raise HTTPException(status_code=404, detail="Business nahi mila!")

    content = await file.read()

    if type == "pdf":
        try:
            text = extract_text_from_pdf(content)
        except ValueError as e:
            raise HTTPException(status_code=422, detail=str(e))
    else:
        try:
            text = content.decode("utf-8")
        except:
            raise HTTPException(status_code=422, detail="File UTF-8 honi chahiye!")

    if len(text.strip()) < 20:
        raise HTTPException(status_code=422, detail="Content bohot chota hai!")

    chunks = chunk_text(text)
    save_faq_chunks(business_slug, chunks)

    return {
        "status": "success",
        "message": f"{len(chunks)} chunks store ho gaye!",
        "chunk_count": len(chunks),
    }