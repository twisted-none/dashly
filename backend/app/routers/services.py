from fastapi import APIRouter, Depends
from typing import List
from app.models import ServiceItem
from app.dependencies import get_current_user

router = APIRouter()

# Данные перенесены с фронтенда
SERVICE_DB = {
    "statistics": [
        {"id": "1", "title": "Общая статистика", "description": "Просмотр общих показателей и ключевых метрик", "icon": "chart"},
        {"id": "2", "title": "Трафик", "description": "Анализ трафика и активности пользователей", "icon": "trend"},
        {"id": "3", "title": "Конверсия", "description": "Показатели конверсии и воронки продаж", "icon": "chart"},
        {"id": "4", "title": "Геолокация", "description": "Распределение пользователей по регионам", "icon": "database"},
        {"id": "5", "title": "Устройства", "description": "Статистика по типам устройств", "icon": "trend"},
        {"id": "6", "title": "Источники", "description": "Анализ источников трафика", "icon": "zap"},
    ],
    "metrics": [
        {"id": "1", "title": "Производительность", "description": "Мониторинг показателей производительности системы", "icon": "chart"},
        {"id": "2", "title": "Доступность", "description": "Отслеживание времени безотказной работы", "icon": "trend"},
        {"id": "3", "title": "Задержки", "description": "Анализ задержек и ответных времен", "icon": "zap"},
        {"id": "4", "title": "Ошибки", "description": "Отслеживание ошибок и проблем", "icon": "brain"},
        {"id": "5", "title": "API метрики", "description": "Мониторинг API и эндпоинтов", "icon": "database"},
        {"id": "6", "title": "Оповещения", "description": "Управление алертами и уведомлениями", "icon": "trend"},
    ],
    "storage": [
        {"id": "1", "title": "Базы данных", "description": "Управление базами данных и таблицами", "icon": "database"},
        {"id": "2", "title": "Файловое хранилище", "description": "Управление файлами и объектами", "icon": "chart"},
        {"id": "3", "title": "Кэш", "description": "Управление кэшированием данных", "icon": "zap"},
        {"id": "4", "title": "Резервные копии", "description": "Создание и восстановление резервных копий", "icon": "trend"},
        {"id": "5", "title": "Архивы", "description": "Управление архивами и историей данных", "icon": "brain"},
        {"id": "6", "title": "Синхронизация", "description": "Синхронизация данных между системами", "icon": "database"},
    ],
    "analytics": [
        {"id": "1", "title": "Поведение", "description": "Анализ поведения пользователей", "icon": "brain"},
        {"id": "2", "title": "Предпочтения", "description": "Выявление предпочтений и интересов", "icon": "trend"},
        {"id": "3", "title": "Прогнозирование", "description": "Прогнозирование тенденций и паттернов", "icon": "chart"},
        {"id": "4", "title": "Когорты", "description": "Анализ по группам и когортам", "icon": "database"},
        {"id": "5", "title": "Сегментация", "description": "Сегментирование аудитории", "icon": "zap"},
        {"id": "6", "title": "ML модели", "description": "Применение машинного обучения к данным", "icon": "brain"},
    ],
    "integrations": [
        {"id": "1", "title": "Внешние API", "description": "Подключение внешних сервисов и API", "icon": "zap"},
        {"id": "2", "title": "Вебхуки", "description": "Настройка входящих и исходящих вебхуков", "icon": "trend"},
        {"id": "3", "title": "Плагины", "description": "Управление плагинами и расширениями", "icon": "chart"},
        {"id": "4", "title": "Синхронизация", "description": "Синхронизация с другими системами", "icon": "database"},
        {"id": "5", "title": "Экспорт", "description": "Экспорт данных в различные форматы", "icon": "brain"},
        {"id": "6", "title": "Импорт", "description": "Импорт данных из внешних источников", "icon": "zap"},
    ],
    "administration": [
        {"id": "1", "title": "Пользователи", "description": "Управление пользователями и доступом", "icon": "chart"},
        {"id": "2", "title": "Роли", "description": "Управление ролями и правами", "icon": "settings"},
        {"id": "3", "title": "Параметры", "description": "Конфигурация системных параметров", "icon": "zap"},
        {"id": "4", "title": "Журналы", "description": "Просмотр логов и истории событий", "icon": "trend"},
        {"id": "5", "title": "Безопасность", "description": "Управление безопасностью и авторизацией", "icon": "database"},
        {"id": "6", "title": "Обслуживание", "description": "Инструменты обслуживания системы", "icon": "brain"},
    ]
}

@router.get("/{service_name}", response_model=List[ServiceItem])
async def get_service_items(service_name: str, user=Depends(get_current_user)):
    """
    Возвращает список элементов для конкретного сервиса.
    Требует авторизации через Keycloak.
    """
    return SERVICE_DB.get(service_name, [])