import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from config import get_settings
from routers import business, upload, chat, logs

settings = get_settings()

os.makedirs(settings.data_dir, exist_ok=True)

app = FastAPI(title="Vorthix API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(business.router)
app.include_router(upload.router)
app.include_router(chat.router)
app.include_router(logs.router)

@app.get("/")
async def root():
    return {"service": "Vorthix API", "status": "healthy"}

@app.get("/health")
async def health():
    return {"status": "ok"}