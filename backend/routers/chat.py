from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.storage import load_faq_chunks, get_business, append_log
from utils.groq_ai import get_faq_answer

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    business_slug: str
    message: str
    session_id: str = "anonymous"

@router.post("")
async def chat(body: ChatRequest):
    if not body.message.strip():
        raise HTTPException(status_code=400, detail="Message khali hai!")

    biz = get_business(body.business_slug)
    if not biz:
        raise HTTPException(status_code=404, detail="Business nahi mila!")

    faq_chunks = load_faq_chunks(body.business_slug)

    answer, needs_human = await get_faq_answer(
        business_name=biz["name"],
        question=body.message,
        faq_chunks=faq_chunks,
    )

    append_log(
        slug=body.business_slug,
        question=body.message,
        answer=answer,
        session_id=body.session_id,
    )

    return {
        "answer": answer,
        "needs_human": needs_human,
        "image_url": None,
    }