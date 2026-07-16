/* =====================================================================
   KYRO — footer.js
   Inyecta el pie de página en #footer-root.
   ===================================================================== */

(function () {
  "use strict";

  function buildHTML() {
    var path = window.location.pathname;
    var base = path.indexOf("/pages/") !== -1 ? "../" : "";

    return ''
      + '<footer class="footer">'
      +   '<div class="footer-inner">'
      +     '<div>'
      +       '<h4>Kyro</h4>'
      +       '<p style="color: var(--color-muted); font-size: 0.9rem;">'
      +         'Proyecto comunitario de ropa alternativa bajo licencia MIT.'
      +       '</p>'
      +     '</div>'
      +     '<div>'
      +       '<h4>Sitio</h4>'
      +       '<ul>'
      +         '<li><a href="' + base + 'index.html">Inicio</a></li>'
      +         '<li><a href="' + base + 'pages/catalog.html">Catálogo</a></li>'
      +         '<li><a href="' + base + 'pages/community.html">Comunidad</a></li>'
      +         '<li><a href="' + base + 'pages/resources.html">Recursos</a></li>'
      +       '</ul>'
      +     '</div>'
      +     '<div>'
      +       '<h4>Cuenta</h4>'
      +       '<ul>'
      +         '<li><a href="' + base + 'pages/account.html">Iniciar sesión</a></li>'
      +         '<li><a href="' + base + 'pages/account.html">Registrarse</a></li>'
      +       '</ul>'
      +     '</div>'
      +     '<div>'
      +       '<h4>Licencia</h4>'
      +       '<ul>'
      +         '<li><a href="https://opensource.org/licenses/MIT" rel="noopener" target="_blank">MIT</a></li>'
      +         '<li><a href="' + base + 'pages/resources.html">Recursos abiertos</a></li>'
      +       '</ul>'
      +     '</div>'
      +   '</div>'
      +   '<p class="footer-copy">© Kyro — Hecho con software libre.</p>'
      + '</footer>';
  }

  function mount() {
    var root = document.getElementById("footer-root");
    if (!root) return;
    root.innerHTML = buildHTML();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
