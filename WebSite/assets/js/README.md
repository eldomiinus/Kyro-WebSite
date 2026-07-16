# assets/js/

Lógica de la capa de datos y de las páginas. Estructura:

- `data.js` — fuente única de datos mock (productos, comunidad,
  recursos, etc.). Será reemplazada por llamadas a la API.
- `products.js` — render de la grilla de productos.
- `product-detail.js` — render de la página individual de producto.
- `community.js` — render de la galería comunitaria.
- `resources.js` — render del listado de descargas open source.
- `account.js` — manejo de formularios de login y registro.
- `main.js` — bootstrap de cada página.

## Cómo conectarlo a un backend

`data.js` expone `window.KYRO.products`, `.community` y `.resources`.
Sustituir este archivo por:

```js
window.KYRO = {};
async function load(endpoint) {
  const res = await fetch(endpoint);
  return res.json();
}
// Cargar en cada página según necesidad.
```

El resto del código (products.js, product-detail.js, etc.) sigue
funcionando porque consumen `KYRO.*` sin importar el origen.
