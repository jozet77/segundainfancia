# Segunda Infancia

Sitio web estático premium para el equipo de fútbol **Segunda Infancia**.

## Stack

- HTML
- CSS
- JavaScript

## Ejecutar localmente

Solo abre `index.html` en el navegador o usa un servidor estático:

```bash
npx serve .
```

## Deploy en Vercel

1. Importa este repositorio en Vercel.
2. Framework preset: **Other**.
3. Build command: *(vacío)*.
4. Output directory: *(vacío, sitio estático en raíz)*.
5. Deploy.

El archivo `vercel.json` ya incluye configuración para servir la home desde `index.html`.


## URL del live stream configurable

El archivo `ext_env` en la raíz del repositorio define la URL del iframe de **Live stream**.

- Debe contener solo una URL (por ejemplo: `https://beelup.com/player.php?id=29449194`).
- Si el archivo no existe o la URL no es válida, se mantiene la URL por defecto en `index.html`.

