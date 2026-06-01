from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from utils.storage import save_business, get_business
from config import get_settings

router = APIRouter(prefix="/business", tags=["business"])
settings = get_settings()

class BusinessCreate(BaseModel):
    name: str
    slug: str
    emoji: str = "🏪"

@router.post("")
async def create_business(
    body: BusinessCreate,
    x_admin_secret: str = Header(default=""),
):
    existing = get_business(body.slug)
    if existing:
        raise HTTPException(status_code=409, detail=f"Slug '{body.slug}' already exists!")
    meta = save_business(slug=body.slug, name=body.name, emoji=body.emoji)
    return {"status": "created", "business": meta}

@router.get("/{slug}")
async def get_business_info(slug: str):
    biz = get_business(slug)
    if not biz:
        raise HTTPException(status_code=404, detail="Business not found")
    return biz