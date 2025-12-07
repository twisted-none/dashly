from pydantic import BaseModel
from typing import List, Optional

class User(BaseModel):
    id: str
    name: str
    email: str

class ServiceItem(BaseModel):
    id: str
    title: str
    description: str
    icon: str

# Модель для ответа API, содержащая данные всех сервисов
class ServicesData(BaseModel):
    statistics: List[ServiceItem]
    metrics: List[ServiceItem]
    storage: List[ServiceItem]
    analytics: List[ServiceItem]
    integrations: List[ServiceItem]
    administration: List[ServiceItem]