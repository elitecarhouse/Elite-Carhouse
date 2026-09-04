# Elite Carhouse

Proyecto listo para correr, subir a GitHub y publicar como app instalable en Android e iPhone.

## 1. Probarlo en tu computador

```bash
npm install
npm run dev
```

Abre la URL que te muestre la terminal (normalmente `http://localhost:5173`).

## 2. Subirlo a GitHub

```bash
git init
git add .
git commit -m "Elite Carhouse"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

(Si ya creaste el repo vacío en GitHub, usa la URL que te dio GitHub en el paso `git remote add origin`.)

## 3. Publicarlo con un dominio real (necesario para que la app sea instalable)

Subir el código a GitHub **no lo pone en internet por sí solo** — solo guarda el código. Para que tu equipo pueda abrirlo desde el celular e instalarlo, necesitas publicarlo en un hosting. El más simple y gratis para este tipo de proyecto es **Vercel**:

1. Entra a [vercel.com](https://vercel.com) y crea una cuenta (puedes usar tu cuenta de GitHub para entrar).
2. "Add New" → "Project" → elige tu repositorio de GitHub.
3. Vercel detecta solo que es un proyecto Vite. No cambies nada, dale "Deploy".
4. En 1-2 minutos te da una URL tipo `https://elite-carhouse.vercel.app` — esa es la que comparten con el equipo.

Cada vez que subas cambios a GitHub (`git push`), Vercel actualiza la app sola.

**Importante:** el instalado como app (PWA) y el service worker **necesitan HTTPS** para funcionar en celulares reales. `localhost` funciona para probar en tu computador, pero para que tu equipo lo instale de verdad, tiene que ser la URL de Vercel (que ya viene con HTTPS incluido).

## 4. Instalar en los celulares

Una vez publicado, cada persona del equipo entra a la URL desde su celular:

- **Android (Chrome):** aparece un banner "Instalar app" solo. Si no, menú ⋮ → "Instalar aplicación".
- **iPhone (Safari, no puede ser Chrome ni el navegador de Instagram/WhatsApp):** botón compartir → "Agregar a la pantalla de inicio".

## ⚠️ Algo importante sobre los datos guardados

Esta app se construyó originalmente probándola dentro de Claude, que tiene una función especial (`window.storage`) para guardar datos compartidos entre todos los que usan la app. **Esa función no existe fuera de Claude.**

Para que no se rompiera al sacarla de ahí, dejé el código con un respaldo automático: si `window.storage` no existe (que es tu caso ahora, corriendo en tu propio hosting), la app guarda los datos en el propio celular/navegador de cada persona (`localStorage`).

Eso significa que **ahora mismo, cada persona del equipo va a ver su propia copia de los datos, no un inventario compartido en tiempo real**. Si el admin publica un carro desde su celular, los comisionistas no lo van a ver reflejado en el suyo — cada quien tiene su propia "copia local".

### Para que el inventario sí se comparta de verdad entre todo el equipo

Hace falta conectar la app a una base de datos real en internet. Las opciones más simples y con plan gratuito de sobra para este tamaño de negocio:

- **Firebase** (de Google) — la más popular, tiene una guía paso a paso muy amigable para crear el proyecto.
- **Supabase** — alternativa muy similar, también gratis para este uso.

Para conectar cualquiera de las dos:
1. Tú creas la cuenta/proyecto en Firebase o Supabase (esto lo tienes que hacer tú, nadie más puede crear tu cuenta).
2. Me pasas las credenciales que te den (API key, URL del proyecto).
3. Yo cambio el código para que en vez de `localStorage` use esa base de datos — el resto de la app (todo lo que ya construimos: inventario, historial, solicitudes, fotos, etc.) no cambia en nada, solo cambia por dentro de dónde saca y guarda los datos.

Avísame cuándo quieras hacer ese paso y seguimos.
