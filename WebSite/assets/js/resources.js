/* =====================================================================
   KYRO — resources.js
   Listado descargable de la sección Open Source.
   ===================================================================== */

(function () {
  "use strict";

  function render(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = KYRO.resources.map(function (r) {
      return ''
        + '<li class="resource-item">'
        +   '<span class="resource-icon" aria-hidden="true">⬇</span>'
        +   '<div class="resource-info">'
        +     '<h3>' + r.name + '</h3>'
        +     '<p>' + r.description + ' · ' + r.format + ' · ' + r.size + '</p>'
        +   '</div>'
        +   '<a class="resource-download" href="' + r.url + '" download>Descargar</a>'
        + '</li>';
    }).join("");
  }

  window.KYROResources = { render: render };
})();
