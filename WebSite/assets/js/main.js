/* =====================================================================
   KYRO — main.js
   Bootstrap de cada página. Aquí se inicializan los componentes
   compartidos y se ejecutan tareas específicas del documento actual.
   ===================================================================== */

(function () {
  "use strict";

  /**
   * Inicializa los componentes globales (navbar, footer, carrito).
   * Se ejecuta apenas el DOM está disponible.
   */
  function init() {
    if (typeof KYRO === "undefined") {
      console.error("[KYRO] data.js no se cargó correctamente.");
      return;
    }

    // 1) Navbar + footer: los inyectan sus propios módulos.
    // 2) Carrito: idem.
    // 3) Comportamiento específico por página:
    handlePageSpecific();
  }

  /**
   * Detecta en qué página estamos y dispara la lógica correspondiente.
   * Las páginas son archivos físicos en /pages, por eso usamos el path.
   */
  function handlePageSpecific() {
    var path = window.location.pathname;

    if (path.endsWith("/index.html") || path === "/" || path.endsWith("/WebSite/")) {
      // Home: renderizamos productos destacados
      if (window.KYROProducts && typeof window.KYROProducts.renderFeatured === "function") {
        window.KYROProducts.renderFeatured("featured-grid", 3);
      }
    } else if (path.endsWith("/catalog.html")) {
      if (window.KYROProducts && typeof window.KYROProducts.renderAll === "function") {
        window.KYROProducts.renderAll("products-grid");
      }
    } else if (path.endsWith("/product.html")) {
      if (window.KYROProductDetail && typeof window.KYROProductDetail.render === "function") {
        window.KYROProductDetail.render();
      }
    } else if (path.endsWith("/community.html")) {
      if (window.KYROCommunity && typeof window.KYROCommunity.render === "function") {
        window.KYROCommunity.render("community-grid");
      }
    } else if (path.endsWith("/resources.html")) {
      if (window.KYROResources && typeof window.KYROResources.render === "function") {
        window.KYROResources.render("resources-grid");
      }
    } else if (path.endsWith("/account.html")) {
      if (window.KYROAccount && typeof window.KYROAccount.init === "function") {
        window.KYROAccount.init();
      }
    }
  }

  // -----------------------------------------------------------------
  // Public API: registrar un módulo de página para que main.js
  // lo descubra automáticamente en el futuro.
  // -----------------------------------------------------------------
  KYRO.registerPage = function (name, api) {
    KYRO["page:" + name] = api;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
