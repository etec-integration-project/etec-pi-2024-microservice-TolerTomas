# Tomas Toler

## clonar el repo
```bash
git clone https://github.com/etec-integration-project/etec-pi-2024-microservice-TolerTomas.git
```

```bash
cd etc-pi-2024-microservice-TolerTomas
```

## Iniciar el contenedor
```bash
docker compose up --build
```

## Testear la app
El ultimo mensaje que da el contenedor deberia ser parecido a 
```json
{
    "auth-server-token": "<jwt-token>"
}
``` 