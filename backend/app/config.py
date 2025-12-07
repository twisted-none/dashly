from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Значения по умолчанию нужны, чтобы линтер не ругался, 
    # но в Docker они будут перезаписаны переменными из docker-compose
    
    FRONTEND_URL: str = "http://localhost"
    
    KEYCLOAK_INTERNAL_URL: str = "http://keycloak:8080"
    KEYCLOAK_EXTERNAL_URL: str = "http://localhost:8080"
    
    KEYCLOAK_REALM: str = "dashly"
    KEYCLOAK_CLIENT_ID: str = "dashly-backend"
    
    DATABASE_URL: str = "postgresql://admin:password@postgres:5432/app_db"

    class Config:
        case_sensitive = True

settings = Settings()