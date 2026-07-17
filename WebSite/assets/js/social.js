/* =====================================================================
   KYRO — social.js
   Set de íconos SVG compartidos por navbar, footer y otros lugares.
   Mantener acá para reusar y centralizar estilos.
   ===================================================================== */

(function () {
  "use strict";

  var ICONS = {
    /* GitHub (octocat simplificado) */
    github: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">'
      + '<path d="M12 .5C5.7.5.7 5.5.7 11.8c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1.9-.2 1.8-.4 2.7-.4s1.8.1 2.7.4c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v3c0 .3.2.6.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.3 5.5 18.3.5 12 .5z"/>'
      + '</svg>',

    /* Instagram */
    instagram: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
      + '<rect x="3" y="3" width="18" height="18" rx="5" ry="5"/>'
      + '<circle cx="12" cy="12" r="4"/>'
      + '<circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>'
      + '</svg>',

    /* Discord */
    discord: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">'
      + '<path d="M19.7 4.4A18 18 0 0 0 15.3 3l-.2.4a16 16 0 0 1 4 1.9 14 14 0 0 0-13 0 16 16 0 0 1 4-1.9L10 3a18 18 0 0 0-4.4 1.4C2.5 8.5 1.7 12.5 2 16.4c1.7 1.3 3.3 2 4.9 2.5l.4-.6a11 11 0 0 1-1.7-.8l.4-.3a13 13 0 0 0 11.7 0l.4.3a11 11 0 0 1-1.7.8l.4.6c1.6-.5 3.2-1.2 4.9-2.5.4-4.5-.7-8.5-3-12zM9 14.3c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/>'
      + '</svg>',

    /* Corazón (wishlist) - vacío */
    heart: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>'
      + '</svg>',

    /* Corazón relleno (estado "agregado a wishlist") */
    heartFilled: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>'
      + '</svg>'
  };

  /** Devuelve el HTML del ícono pedido. */
  function icon(name) {
    return ICONS[name] || "";
  }

  /** Conjunto entero (útil para iterar). */
  function all() {
    return ICONS;
  }

  window.KYROSocial = { icon: icon, all: all };
})();
