# Dashly

Git-ready deployment bundle for Dashly frontend, backend, PostgreSQL, Keycloak and Caddy.

```bash
cp .env.example .env
docker compose up -d --build
```

Update `keycloak_config/realm-export.json` redirect URLs if you use domains
different from the defaults in `.env.example`.
