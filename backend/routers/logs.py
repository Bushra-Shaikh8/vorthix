from fastapi import APIRouter, HTTPException
from utils.storage import get_logs, get_business

router = APIRouter(prefix="/logs", tags=["logs"])

@router.get("/{business_slug}")
async def get_conversation_logs(business_slug: str):
    biz = get_business(business_slug)
    if not biz:
        raise HTTPException(status_code=404, detail="Business nahi mila!")
    logs = get_logs(business_slug)
    return {"logs": logs, "total": len(logs)}