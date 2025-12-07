from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from keycloak import KeycloakOpenID
from app.config import settings
from app.models import User

# Для Swagger UI мы даем ссылку, доступную из браузера (localhost)
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.KEYCLOAK_EXTERNAL_URL}/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/token"
)

# Для проверки токена внутри контейнера используем внутренний URL
# Но при этом указываем verify_token=True, который будет стучаться на сервер
keycloak_openid = KeycloakOpenID(
    server_url=settings.KEYCLOAK_INTERNAL_URL,
    client_id=settings.KEYCLOAK_CLIENT_ID,
    realm_name=settings.KEYCLOAK_REALM,
)

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    try:
        # Используем introspection endpoint (бекенд сам спросит у keycloak: "этот токен валиден?")
        user_info = keycloak_openid.userinfo(token)
        
        return User(
            id=user_info.get("sub"),
            name=user_info.get("name") or user_info.get("preferred_username"),
            email=user_info.get("email")
        )
    except Exception as e:
        print(f"Auth error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )