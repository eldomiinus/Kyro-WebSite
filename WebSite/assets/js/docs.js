/* =====================================================================
   KYRO — docs.js
   Resalta el link activo del sidebar según la sección visible.
   Usa IntersectionObserver para que el resaltado siga al scroll.
   ===================================================================== */

(function () {
  "use strict";

  function init() {
    var navLinks = document.querySelectorAll(".docs-nav a[href^='#']");
    if (!navLinks.length) return;

    function setActive(id) {
      navLinks.forEach(function (a) {
        if (a.getAttribute("href") === "#" + id) {
          a.classList.add("is-active");
        } else {
          a.classList.remove("is-active");
        }
      });
    }

    // Mapeamos id -> link
    var sections = [];
    navLinks.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) sections.push({ id: id, el: el });
    });

    if (!sections.length) return;

    // Si el navegador no soporta IntersectionObserver, marcamos el primero.
    if (!("IntersectionObserver" in window)) {
      setActive(sections[0].id);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      // Tomamos la primera sección visible desde arriba.
      var visible = entries
        .filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top; })[0];
      if (visible) setActive(visible.target.id);
    }, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0
    });

    sections.forEach(function (s) { observer.observe(s.el); });

    // Activar el primero al cargar
    setActive(sections[0].id);
  }

  window.KYRODocs = { init: init };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
