/* =====================================================================
   KYRO — product-detail.js
   Render de la página individual. Lee ?id= desde la URL.
   ===================================================================== */

(function () {
  "use strict";

  function render() {
    var root = document.getElementById("product-detail");
    if (!root) return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var product = id ? KYRO.getProduct(id) : null;

    if (!product) {
      root.innerHTML = ''
        + '<section class="empty-state">'
        +   '<h2>Producto no encontrado</h2>'
        +   '<p>Volvé al <a href="catalog.html">catálogo</a> para ver todas las piezas.</p>'
        + '</section>';
      return;
    }

    // Costes desglosados para "Transparencia de Costos"
    var c = product.costs || {};
    var transparencyRows = [
      ["Costo prenda lisa",     c.base  || 0],
      ["Costo tinta / material", c.ink   || 0],
      ["Trabajo",               c.labor || 0],
      ["Gastos fijos",          c.fixed || 0]
    ];
    var transparencyHTML = transparencyRows.map(function (row) {
      return '<tr><th>' + row[0] + '</th><td>' + KYRO.formatPrice(row[1]) + '</td></tr>';
    }).join("") + '<tr><th>Total</th><td>' + KYRO.formatPrice(product.price) + '</td></tr>';

    // Mini galería comunitaria relacionada (toma las primeras 4 entradas)
    var related = KYRO.community.slice(0, 4);
    var galleryHTML = related.map(function (item) {
      return ''
        + '<figure class="community-card">'
        +   '<img src="' + item.image + '" alt="Foto de ' + item.user + '" loading="lazy" />'
        +   '<figcaption class="community-card-body">'
        +     '<span class="community-card-user">@' + item.user + '</span>'
        +     '<span class="community-card-meta">' + item.date + '</span>'
        +     '<p class="community-card-caption">' + item.caption + '</p>'
        +   '</figcaption>'
        + '</figure>';
    }).join("");

    root.innerHTML = ''
      + '<article class="product-detail-top">'
      +   '<img class="product-detail-image" src="' + product.image + '" alt="' + product.name + '" />'
      +   '<div class="product-detail-info">'
      +     '<span class="product-card-category">' + product.category + '</span>'
      +     '<h1>' + product.name + '</h1>'
      +     '<p class="product-detail-desc">' + product.description + '</p>'
      +     '<p class="product-detail-price">' + KYRO.formatPrice(product.price) + '</p>'
      +     '<div class="product-detail-actions">'
      +       '<button class="btn-primary" data-add-to-cart="' + product.id + '">Agregar al carrito</button>'
      +       '<a class="btn-secondary" href="catalog.html">Volver al catálogo</a>'
      +     '</div>'
      +   '</div>'
      + '</article>'

      // Bloque de Transparencia de Costos (pieza clave de la marca)
      + '<section class="transparency" aria-labelledby="transparency-title">'
      +   '<h2 id="transparency-title">Transparencia de Costos</h2>'
      +   '<p>Cómo se compone el precio que ves. Sin sorpresas, sin markup abusivo.</p>'
      +   '<table class="transparency-table">'
      +     transparencyHTML
      +   '</table>'
      + '</section>'

      // Galería Comunitaria (reemplaza al sistema de reseñas tradicional)
      + '<section aria-labelledby="gallery-title">'
      +   '<h2 id="gallery-title">Galería Comunitaria</h2>'
      +   '<p>Cómo otras personas están usando y modificando este diseño.</p>'
      +   '<div class="community-grid">' + galleryHTML + '</div>'
      +   '<p style="text-align:center; margin-top: var(--space-3)">'
      +     '<a class="btn-secondary" href="community.html">Ver más aportes</a>'
      +   '</p>'
      + '</section>';
  }

  window.KYROProductDetail = { render: render };
})();
