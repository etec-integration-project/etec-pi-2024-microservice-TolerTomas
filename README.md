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
El primer mensaje que da el contenedor deberia ser parecido a 
```json
{
    "auth-server-token": "<jwt-token>"
}
``` 

Para probar el endpoint para crear una carpeta, en postman / insomnia / etc realizar una peticion **post** a http://127.0.0.1:8080/mkdir con el siguiente modelo de json
```json
{
    "path": "/",
    "newDir": "wallpaper"
}
```

Esto deberia de crear dentro de tu directorio personal dentro del server una nueva carpeta llamada **wallpaper**.

Después, para subir una carpeta, se debe de realizar una peticion **post** a http://127.0.0.1:8080/upload, respetando el siguiente modelo.
```json
{
    "file": "[files]", # uno o más archivos (cualquier extensión)
    "path" : "/wallpaper" 
}
```

Y para poder ver los archivos que uno a subido y carpetas que ha creado, se debe de realizar un **get** a http://127.0.0.1:8080/list con el siguiente modelo de json:
```json
{
    "path": "/wallpaper"
}
```

