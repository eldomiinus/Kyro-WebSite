/* =====================================================================
   KYRO — community.js
   Render de la galería comunitaria en /pages/community.html
   ===================================================================== */

(function () {
  "use strict";

  function render(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = KYRO.community.map(function (item) {
      return ''
        + '<article class="community-card">'
        +   '<img src="' + item.image + '" alt="Aporte de ' + item.user + '" loading="lazy" />'
        +   '<div class="community-card-body">'
        +     '<span class="community-card-user">@' + item.user + '</span>'
        +     '<span class="community-card-meta">' + item.date + '</span>'
        +     '<p class="community-card-caption">' + item.caption + '</p>'
        +   '</div>'
        + '</article>';
    }).join("");
  }

  window.KYROCommunity = { render: render };
})();
