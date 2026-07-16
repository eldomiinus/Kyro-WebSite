/* =====================================================================
   KYRO — filters.js
   Aplica los filtros del form de catálogo sobre la lista de productos.
   ===================================================================== */

(function () {
  "use strict";

  /**
   * Devuelve una nueva lista filtrada/ordenada a partir de los valores
   * del formulario de filtros.
   */
  function apply(products, form) {
    if (!form) return products.slice();

    var fd = new FormData(form);
    var categories = fd.getAll("category");
    var types = fd.getAll("type");
    var sort = (fd.get("sort") || "relevance").toString();

    var filtered = products.filter(function (p) {
      if (categories.length && categories.indexOf(p.category) === -1) return false;
      if (types.length && types.indexOf(p.type) === -1) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":  filtered.sort(function (a, b) { return a.price - b.price; }); break;
      case "price-desc": filtered.sort(function (a, b) { return b.price - a.price; }); break;
      case "name":       filtered.sort(function (a, b) { return a.name.localeCompare(b.name); }); break;
    }
    return filtered;
  }

  window.KYROFilters = { apply: apply };
})();
