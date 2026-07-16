/* =====================================================================
   KYRO — navbar.js
   Inyecta la barra de navegación fija en #navbar-root.
   La navegación es consciente de la ruta actual para marcar el link
   activo y maneja el botón del carrito.
   ===================================================================== */

(function () {
  "use strict";

  /**
   * Construye el HTML de la navbar. Mantener la estructura
   * sincronizada con components/navbar.css.
   */
  function buildHTML() {
    var path = window.location.pathname;
    function isActive(route) {
      return path.indexOf(route) !== -1;
    }
    // Calculamos la raíz del sitio (sube un nivel si estamos en /pages/).
    var inPages = path.indexOf("/pages/") !== -1;
    var base = inPages ? "../" : "";

    return ''
      + '<nav class="navbar" aria-label="Navegación principal">'
      +   '<div class="navbar-inner">'
      +     '<a class="navbar-logo" href="' + base + 'index.html">KYR<span>O</span></a>'
      +     '<ul class="navbar-links">'
      +       '<li><a href="' + base + 'index.html" class="' + (isActive("/index.html") || path.endsWith("/WebSite/") ? "active" : "") + '">Inicio</a></li>'
      +       '<li><a href="' + base + 'pages/catalog.html" class="' + (isActive("/catalog.html") ? "active" : "") + '">Catálogo</a></li>'
      +       '<li><a href="' + base + 'pages/community.html" class="' + (isActive("/community.html") ? "active" : "") + '">Comunidad</a></li>'
      +       '<li><a href="' + base + 'pages/resources.html" class="' + (isActive("/resources.html") ? "active" : "") + '">Recursos Open Source</a></li>'
      +     '</ul>'
      +     '<form class="navbar-search" role="search" onsubmit="event.preventDefault();">'
      +       '<input type="search" placeholder="Buscar prendas o accesorios…" aria-label="Buscar" />'
      +     '</form>'
      +     '<div class="navbar-actions">'
      +       '<a class="navbar-btn" href="' + base + 'pages/account.html" aria-label="Mi cuenta">'
      +         '👤'
      +       '</a>'
      +       '<button class="navbar-btn" id="open-cart" type="button" aria-label="Abrir carrito">'
      +         '🛒 <span id="cart-badge" class="cart-badge" hidden>0</span>'
      +       '</button>'
      +     '</div>'
      +   '</div>'
      + '</nav>';
  }

  function mount() {
    var root = document.getElementById("navbar-root");
    if (!root) return;
    root.innerHTML = buildHTML();

    // Botón del carrito: delega la apertura al módulo cart.js
    var openBtn = document.getElementById("open-cart");
    if (openBtn && window.KYROCart) {
      openBtn.addEventListener("click", function () {
        window.KYROCart.open();
      });
    }
  }

  // Expuesto para que cart.js pueda refrescar el badge.
  window.KYRONavbar = { mount: mount };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
