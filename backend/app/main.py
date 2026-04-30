from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import services

app = FastAPI(title="Dashly API")

# Настройка CORS для фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL], # Разрешаем запросы с React
    allow_credentials=True,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(services.router, prefix="/api/services", tags=["Services"])

@app.get("/")
def read_root():
    return {"message": "Dashly API is running"}
