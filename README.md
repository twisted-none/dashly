# 🚀 Dashly — Корпоративная панель управления

Современный дашборд с микросервисной архитектурой, неоновым UI и централизованной авторизацией.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)
![Keycloak](https://img.shields.io/badge/Keycloak-add8e6?style=flat&logo=keycloak&logoColor=white)

## ✨ Особенности

*   **Frontend:** React + Vite + TypeScript (Неоновая темная/светлая тема).
*   **Backend:** Python FastAPI (Асинхронный API).
*   **Auth:** Keycloak (OIDC/OAuth2) — единый вход (SSO).
*   **Database:** PostgreSQL.
*   **Deploy:** Полная контейнеризация через Docker Compose.

## 🛠 Технический стек

*   **Client:** React 18, TailwindCSS, Lucide Icons, React OIDC Context.
*   **Server:** FastAPI, Pydantic, SQLAlchemy, Python-Keycloak.
*   **Infrastructure:** Docker, Nginx, PostgreSQL 15.

## 🚀 Быстрый старт

### Предварительные требования
*   Docker & Docker Compose
*   Git

## 1. Клонирование репозитория
```bash
git clone https://github.com/ВАШ_НИКНЕЙМ/dashly.git
cd dashly
```
## 2.Настройка окружения

Создайте файл .env в папке frontend (используйте ваш IP адрес, не localhost, если запускаете на сервере):
```bash
# frontend/.env
VITE_API_URL=http://ВАШ_IP:8000/api
VITE_KEYCLOAK_URL=http://ВАШ_IP:8080/realms/dashly
VITE_KEYCLOAK_CLIENT_ID=dashly-frontend
```
## 3. Запуск
```bash
docker-compose up -d --build
```
## После запуска будут доступны сервисы:

Frontend: http://localhost (или ваш IP)
Keycloak: http://localhost:8080
Backend Docs: http://localhost:8000/docs

## 🔐 Настройка Keycloak

Для первого запуска необходимо настроить Keycloak:
Зайдите в админку: http://ВАШ_IP:8080 (Логин/Пароль: admin/admin - см. docker-compose).
Создайте Realm с именем dashly.
### Создайте Client:

Client ID: dashly-frontend
Valid Redirect URIs: http://ВАШ_IP/*
Web Origins: +
#### Создайте пользователя в разделе Users и задайте ему пароль (Credentials -> Set Password)
### ⚠️ Важно для HTTP (без SSL)

Если вы запускаете проект по IP-адресу без HTTPS, браузер может блокировать авторизацию.
Для Chrome перейдите по ссылке chrome://flags/#unsafely-treat-insecure-origin-as-secure, добавьте ваш IP (http://ВАШ_IP) и включите опцию.
## 📂 Структура проекта
```code
.
├── backend/            # FastAPI приложение
├── frontend/           # React приложение
├── docker-compose.yml  # Оркестрация контейнеров
└── init-db.sh          # Скрипт инициализации БД
```