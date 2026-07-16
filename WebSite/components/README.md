# components/

Componentes modulares de UI. Cada componente incluye su `.js` y su
`.css` con el mismo nombre base:

- `navbar.js` + `navbar.css`
- `footer.js` + `footer.css`
- `cart.js`   + `cart.css`
- `filters.js` + `filters.css`
- `product-card.css`     (estilos de tarjeta de producto)
- `product-detail.css`   (estilos de la página de producto)
- `community-gallery.css`(galería comunitaria / reseñas alternativas)
- `resources.css`        (listado descargable)
- `account.css`          (login + registro)

## Cómo se montan

Los HTML tienen un `<div id="navbar-root"></div>` y un
`<div id="footer-root"></div>`. Los componentes buscan esos
contenedores y los reemplazan con su HTML. Esto permite reutilizar
navbar y footer en todas las páginas sin duplicar marcado.

Los scripts exponen una API global (`window.KYROCart`, `KYROFilters`,
etc.) para que `main.js` y el resto de los módulos se comuniquen.
