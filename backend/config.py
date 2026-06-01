from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    groq_api_key: str = ""
    groq_model: str = "llama3-8b-8192"
    allowed_origins: str = "http://localhost:3000"
    data_dir: str = "./data"
    admin_secret: str = "change-this-secret"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    return Settings()