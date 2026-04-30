from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    FRONTEND_URL: str = "http://localhost"

    KEYCLOAK_INTERNAL_URL: str = "http://keycloak:8080"
    KEYCLOAK_EXTERNAL_URL: str = "http://localhost:8080"

    KEYCLOAK_REALM: str = "dashly"
    KEYCLOAK_CLIENT_ID: str = "dashly-backend"

    DATABASE_URL: str = "postgresql://localhost/dashly"

    class Config:
        case_sensitive = True

settings = Settings()
