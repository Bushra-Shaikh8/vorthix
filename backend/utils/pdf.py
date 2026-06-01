import io
from PyPDF2 import PdfReader

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        pages = []
        for page in reader.pages:
            text = page.extract_text()
            if text:
                pages.append(text.strip())
        full_text = "\n\n".join(pages)
        if not full_text.strip():
            return ""
        return full_text
    except Exception as e:
        raise ValueError(f"PDF parse nahi hua: {str(e)}")