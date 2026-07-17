/* =====================================================================
   KYRO — footer.js
   Inyecta el pie de página en #footer-root.
   ===================================================================== */

(function () {
  "use strict";

  function buildHTML() {
    var path = window.location.pathname;
    var base = path.indexOf("/pages/") !== -1 ? "../" : "";

    // Íconos sociales — usa KYROSocial si está disponible, si no, texto.
    var socials = (window.KYROSocial && window.KYROSocial.icon) || function () { return ""; };

    return ''
      + '<footer class="footer">'
      +   '<div class="footer-inner">'
      +     '<div>'
      +       '<h4>Kyro</h4>'
      +       '<p style="color: var(--color-muted); font-size: 0.9rem;">'
      +         'Proyecto comunitario de ropa alternativa bajo licencia MIT.'
      +       '</p>'
      // Bloque de redes sociales con íconos SVG.
      +       '<div class="footer-socials" aria-label="Redes sociales">'
      +         '<a class="footer-social-link" href="https://github.com/eldomiinus/Kyro-WebSite" rel="noopener" target="_blank" aria-label="GitHub">'
      +           socials("github") + '<span>GitHub</span>'
      +         '</a>'
      +         '<a class="footer-social-link" href="https://www.instagram.com/kyroshop.exe/" rel="noopener" target="_blank" aria-label="Instagram">'
      +           socials("instagram") + '<span>Instagram</span>'
      +         '</a>'
      +         '<a class="footer-social-link" href="#" rel="noopener" aria-label="Discord (próximamente)">'
      +           socials("discord") + '<span>Discord</span>'
      +         '</a>'
      +       '</div>'
      +     '</div>'
      +     '<div>'
      +       '<h4>Sitio</h4>'
      +       '<ul>'
      +         '<li><a href="' + base + 'index.html">Inicio</a></li>'
      +         '<li><a href="' + base + 'pages/catalog.html">Catálogo</a></li>'
      +         '<li><a href="' + base + 'pages/community.html">Comunidad</a></li>'
      +         '<li><a href="' + base + 'pages/resources.html">Recursos Open Source</a></li>'
      +         '<li><a href="' + base + 'pages/docs.html">Docs</a></li>'
      +         '<li><a href="' + base + 'pages/blog.html">Blog</a></li>'
      +       '</ul>'
      +     '</div>'
      +     '<div>'
      +       '<h4>Cuenta</h4>'
      +       '<ul>'
      +         '<li><a href="' + base + 'pages/account.html">Iniciar sesión</a></li>'
      +         '<li><a href="' + base + 'pages/account.html">Registrarse</a></li>'
      +         '<li><a href="' + base + 'pages/wishlist.html">Mi lista de deseos</a></li>'
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

  // Re-montar si los íconos sociales se cargan después que el footer.
  // (El script social.js se carga antes, pero por las dudas exponemos
  // un evento público para forzar re-render cuando lleguen.)
  document.addEventListener("kyro:socials-ready", function () { mount(); });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
