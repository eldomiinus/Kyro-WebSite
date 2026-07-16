# WebSite

Esqueleto funcional de la página web de **Kyro**, marca comunitaria
independiente de ropa y accesorios alternativos.

## Propósito de esta carpeta

Este directorio contiene **únicamente la base estructural** del sitio
(HTML, CSS y JS modular). Está pensada para que el equipo de Kyro
pueda:

1. Integrar sus estilos visuales y tipografías reales.
2. Reemplazar la capa de datos mock (`assets/js/data.js`) por una
   API real.
3. Sumar autenticación, medios de pago y backend sin reescribir la
   UI.

La licencia del sitio es **MIT** (ver [LICENSE](../LICENSE) en la
raíz del repositorio). Los diseños gráficos publicados son libres.

## Estructura

```
WebSite/
├── index.html              → Página de inicio
├── pages/                  → Catálogo, producto, comunidad, recursos, cuenta
├── components/             → Componentes UI (navbar, footer, cart, …)
│   ├── navbar.js / navbar.css
│   ├── footer.js / footer.css
│   ├── cart.js   / cart.css
│   ├── filters.js/ filters.css
│   └── …
├── assets/
│   ├── css/main.css        → Variables, reset, layout base
│   ├── js/                 → Capa de datos y lógica de páginas
│   └── img/                → Imágenes (placeholders por ahora)
```

## Cómo abrir el sitio

El proyecto es 100% estático: no necesita build ni dependencias.

```bash
# Opción 1: abrir directamente
xdg-open WebSite/index.html        # Linux
open WebSite/index.html            # macOS

# Opción 2: servir con un servidor local
python3 -m http.server 8080 --directory WebSite
# luego visitá http://localhost:8080
```

## Cómo extender

- **Estilos**: modificá las variables en `assets/css/main.css` o
  añadí tu propio `theme-*.css`.
- **Datos**: reemplazá `assets/js/data.js` por `fetch()` a tu API.
- **Backend de auth**: los `// Punto de integración con backend`
  en `cart.js` y `account.js` marcan dónde conectar.
- **Productos nuevos**: agregalos en `data.js` y aparecerán
  automáticamente en el catálogo y los destacados.

## Convenciones

- Un componente = un `.js` + un `.css` con el mismo nombre.
- Los HTML no contienen lógica: sólo estructura y montaje.
- La capa de datos vive en `window.KYRO` para desacoplar la UI del
  origen (mock hoy, API mañana).
