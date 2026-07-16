# pages/

Páginas HTML del sitio. Todas comparten la misma estructura:

- Cargan `assets/css/main.css` como hoja base.
- Cargan los CSS de los componentes que utilizan.
- Incluyen `<div id="navbar-root">` y `<div id="footer-root">` que son
  reemplazados por los módulos JS al cargar.
- Incluyen `<aside id="side-cart">` y `<div id="cart-overlay">` para
  el carrito lateral.
- Al final del `<body>` cargan los scripts en el orden correcto:
  `data.js` → componentes → módulo de página → `main.js`.

Páginas disponibles:

- `catalog.html`     — Catálogo / tienda.
- `product.html`     — Ficha individual (usa `?id=ky-001`).
- `community.html`   — Galería comunitaria.
- `resources.html`   — Recursos open source.
- `account.html`     — Login y registro.
