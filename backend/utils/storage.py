import json
import re
from datetime import datetime
from pathlib import Path
from config import get_settings

settings = get_settings()

def _business_dir(slug: str) -> Path:
    path = Path(settings.data_dir) / slug
    path.mkdir(parents=True, exist_ok=True)
    return path

def save_business(slug: str, name: str, emoji: str = "🏪") -> dict:
    meta = {"slug": slug, "name": name, "emoji": emoji, "created_at": datetime.utcnow().isoformat()}
    path = _business_dir(slug) / "meta.json"
    path.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    return meta

def get_business(slug: str):
    path = _business_dir(slug) / "meta.json"
    if not path.exists():
        return None
    try:
        content = path.read_text(encoding="utf-8").strip()
        if not content:
            return None
        return json.loads(content)
    except:
        return None

def save_faq_chunks(slug: str, chunks: list) -> None:
    path = _business_dir(slug) / "faq.json"
    data = {"chunks": chunks, "updated_at": datetime.utcnow().isoformat()}
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

def load_faq_chunks(slug: str) -> list:
    path = _business_dir(slug) / "faq.json"
    if not path.exists():
        return []
    try:
        content = path.read_text(encoding="utf-8").strip()
        if not content:
            return []
        return json.loads(content).get("chunks", [])
    except:
        return []

def append_log(slug: str, question: str, answer: str, session_id: str) -> None:
    path = _business_dir(slug) / "logs.json"
    logs = []
    if path.exists():
        try:
            content = path.read_text(encoding="utf-8").strip()
            if content:
                logs = json.loads(content)
        except:
            logs = []
    logs.append({
        "question": question,
        "answer": answer,
        "session_id": session_id,
        "timestamp": datetime.utcnow().isoformat(),
    })
    logs = logs[-500:]
    path.write_text(json.dumps(logs, ensure_ascii=False, indent=2), encoding="utf-8")

def get_logs(slug: str) -> list:
    path = _business_dir(slug) / "logs.json"
    if not path.exists():
        return []
    try:
        content = path.read_text(encoding="utf-8").strip()
        if not content:
            return []
        return list(reversed(json.loads(content)))
    except:
        return []

def chunk_text(text: str) -> list:
    text = text.strip()
    if not text:
        return []
    qa_blocks = re.split(r'\n(?=Q:|Question:)', text, flags=re.IGNORECASE)
    if len(qa_blocks) > 1:
        return [b.strip() for b in qa_blocks if b.strip()]
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    chunks = []
    current = ""
    for para in paragraphs:
        if len(current) + len(para) < 500:
            current = (current + "\n\n" + para).strip()
        else:
            if current:
                chunks.append(current)
            current = para
    if current:
        chunks.append(current)
    return chunks