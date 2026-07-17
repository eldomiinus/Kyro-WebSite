/* =====================================================================
   KYRO — navbar.js
   Inyecta la barra de navegación fija en #navbar-root.
   La navegación es consciente de la ruta actual para marcar el link
   activo y maneja el botón del carrito y la wishlist.
   ===================================================================== */

(function () {
  "use strict";

  /**
   * Construye el HTML de la navbar. Mantener la estructura
   * sincronizada con components/navbar.css.
   *
   * Si social.js está cargado, agrega los íconos SVG reales;
   * si no, usa placeholders de texto para que el layout no rompa.
   */
  function buildHTML() {
    var path = window.location.pathname;
    function isActive(route) {
      return path.indexOf(route) !== -1;
    }
    // Calculamos la raíz del sitio (sube un nivel si estamos en /pages/).
    var inPages = path.indexOf("/pages/") !== -1;
    var base = inPages ? "../" : "";

    // Íconos sociales — usa KYROSocial si está disponible, si no, texto.
    var socials = (window.KYROSocial && window.KYROSocial.icon) || function () { return ""; };
    var socialsHTML = ''
      + '<a class="navbar-social-link" href="https://github.com/eldomiinus/Kyro-WebSite" rel="noopener" target="_blank" aria-label="GitHub de Kyro">'
      +   socials("github")
      + '</a>'
      + '<a class="navbar-social-link" href="https://www.instagram.com/kyroshop.exe/" rel="noopener" target="_blank" aria-label="Instagram de Kyro">'
      +   socials("instagram")
      + '</a>'
      + '<a class="navbar-social-link" href="#" rel="noopener" aria-label="Discord de Kyro (próximamente)">'
      +   socials("discord")
      + '</a>';

    return ''
      + '<nav class="navbar" aria-label="Navegación principal">'
      +   '<div class="navbar-inner">'
      +     '<a class="navbar-logo" href="' + base + 'index.html">KYR<span>O</span></a>'
      +     '<ul class="navbar-links">'
      +       '<li><a href="' + base + 'index.html" class="' + (isActive("/index.html") || path.endsWith("/WebSite/") ? "active" : "") + '">Inicio</a></li>'
      +       '<li><a href="' + base + 'pages/catalog.html" class="' + (isActive("/catalog.html") ? "active" : "") + '">Catálogo</a></li>'
      +       '<li><a href="' + base + 'pages/community.html" class="' + (isActive("/community.html") ? "active" : "") + '">Comunidad</a></li>'
      +       '<li><a href="' + base + 'pages/resources.html" class="' + (isActive("/resources.html") ? "active" : "") + '">Recursos Open Source</a></li>'
      +       '<li><a href="' + base + 'pages/docs.html" class="' + (isActive("/docs.html") ? "active" : "") + '">Docs</a></li>'
      +       '<li><a href="' + base + 'pages/blog.html" class="' + (isActive("/blog.html") ? "active" : "") + '">Blog</a></li>'
      +     '</ul>'
      +     '<form class="navbar-search" role="search" onsubmit="event.preventDefault();">'
      +       '<input type="search" placeholder="Buscar prendas o accesorios…" aria-label="Buscar" />'
      +     '</form>'
      +     '<div class="navbar-actions">'
      // Wishlist: ícono de corazón con badge
      +       '<a class="navbar-btn" href="' + base + 'pages/wishlist.html" id="open-wishlist" aria-label="Mi lista de deseos">'
      +         socials("heart")
      +         ' <span id="wishlist-badge" class="wishlist-badge" hidden>0</span>'
      +       '</a>'
      +       '<a class="navbar-btn" href="' + base + 'pages/account.html" aria-label="Mi cuenta">'
      +         '👤'
      +       '</a>'
      +       '<button class="navbar-btn" id="open-cart" type="button" aria-label="Abrir carrito">'
      +         '🛒 <span id="cart-badge" class="cart-badge" hidden>0</span>'
      +       '</button>'
      +       '<div class="navbar-socials">' + socialsHTML + '</div>'
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
  window.KYRONavbar = { mount: mount, build: buildHTML };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
