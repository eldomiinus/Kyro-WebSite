/* =====================================================================
   KYRO — products.js
   Render de la grilla de productos. Lo usan:
     - index.html  → destacados (top N)
     - catalog.html → grilla completa + integración con filtros
   ===================================================================== */

(function () {
  "use strict";

  /** Devuelve el HTML del corazón (ícono SVG si social.js está cargado). */
  function heartIcon() {
    var socials = (window.KYROSocial && window.KYROSocial.icon) || function () { return "♡"; };
    return socials("heart");
  }

  /**
   * Crea el HTML de una tarjeta de producto.
   * @param {Object} product  — entrada de KYRO.products
   * @param {boolean} showAdd — muestra el botón "Agregar al carrito"
   */
  function productCard(product, showAdd) {
    var showAddBtn = showAdd !== false;
    return ''
      + '<article class="product-card" data-id="' + product.id + '">'
      // Botón de wishlist (corazón) sobre la imagen.
      +   '<button class="product-card-wishlist" type="button" '
      +           'data-wishlist-toggle="' + product.id + '" '
      +           'aria-label="Agregar a la lista de deseos" '
      +           'aria-pressed="false">'
      +     heartIcon()
      +   '</button>'
      +   '<a href="product.html?id=' + product.id + '">'
      +     '<img class="product-card-image" src="' + product.image + '" alt="' + product.name + '" loading="lazy" />'
      +   '</a>'
      +   '<div class="product-card-body">'
      +     '<span class="product-card-category">' + product.category + '</span>'
      +     '<h3 class="product-card-title">' + product.name + '</h3>'
      +     '<span class="product-card-price">' + KYRO.formatPrice(product.price) + '</span>'
      +     '<div class="product-card-actions">'
      +       '<a class="product-card-btn" href="product.html?id=' + product.id + '">Ver</a>'
      +       (showAddBtn
            ? '<button class="product-card-btn product-card-btn--primary" data-add-to-cart="' + product.id + '">Agregar</button>'
            : '')
      +     '</div>'
      +   '</div>'
      + '</article>';
  }

  /**
   * Renderiza los primeros N productos en un contenedor.
   * Tras renderizar, sincroniza el estado de los corazones y emite
   * el evento 'kyro:products-rendered' (lo escucha wishlist.js).
   */
  function renderFeatured(containerId, limit) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var items = KYRO.products.slice(0, limit || 3);
    container.innerHTML = items.map(function (p) { return productCard(p, true); }).join("");
    afterRender(container);
  }

  /**
   * Renderiza la grilla completa, con soporte para filtros aplicados.
   * Si filters.js está cargado, se conecta automáticamente al form.
   */
  function renderAll(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    function draw(list) {
      if (!list.length) {
        container.innerHTML = "";
        document.getElementById("catalog-empty")?.removeAttribute("hidden");
      } else {
        document.getElementById("catalog-empty")?.setAttribute("hidden", "");
        container.innerHTML = list.map(function (p) { return productCard(p, true); }).join("");
      }
      var countEl = document.getElementById("catalog-count");
      if (countEl) countEl.textContent = list.length + " producto" + (list.length === 1 ? "" : "s");
      afterRender(container);
    }

    draw(KYRO.products);

    // Si filters.js expone applyFilters, lo conectamos al evento submit.
    if (window.KYROFilters && typeof window.KYROFilters.apply === "function") {
      var form = document.getElementById("filters-form");
      if (form) {
        form.addEventListener("change", function () {
          var filtered = window.KYROFilters.apply(KYRO.products, form);
          draw(filtered);
        });
        form.addEventListener("reset", function () {
          // Esperamos a que se apliquen los valores por defecto.
          setTimeout(function () { draw(KYRO.products); }, 0);
        });
      }
    }
  }

  /**
   * Disparador de eventos posterior al render. La wishlist escucha
   * 'kyro:products-rendered' para sincronizar el estado de los
   * corazones sin importar cuándo se monte.
   */
  function afterRender(container) {
    document.dispatchEvent(new CustomEvent("kyro:products-rendered", {
      bubbles: false,
      detail: { container: container }
    }));
    if (window.KYROWishlist) window.KYROWishlist.refreshUI();
  }

  // API pública
  window.KYROProducts = {
    renderFeatured: renderFeatured,
    renderAll: renderAll,
    productCard: productCard
  };
})();
