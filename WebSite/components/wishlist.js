/* =====================================================================
   KYRO — wishlist.js
   Manejo de la "Lista de Deseos" (Favoritos).
   - Estado persistido en localStorage.
   - API: KYROWishlist.toggle(id), has(id), list(), clear()
   - Se conecta automáticamente con botones [data-wishlist-toggle]
     y con las tarjetas renderizadas por products.js
   ===================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "kyro:wishlist";

  /** Carga la lista desde localStorage. */
  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  /** Persiste la lista. */
  function save(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) { /* sin storage: sigue en memoria */ }
  }

  /** Estado en memoria. */
  var state = load();

  /** Devuelve una copia del array de IDs. */
  function list() {
    return state.slice();
  }

  /** ¿El producto está en la wishlist? */
  function has(id) {
    return state.indexOf(id) !== -1;
  }

  /**
   * Agrega o quita un producto de la wishlist.
   * Devuelve el estado resultante: true si quedó adentro, false si no.
   */
  function toggle(id) {
    if (!id) return false;
    var idx = state.indexOf(id);
    if (idx === -1) {
      state.push(id);
      save(state);
      return true;
    }
    state.splice(idx, 1);
    save(state);
    return false;
  }

  /** Vacía la wishlist. */
  function clear() {
    state = [];
    save(state);
    return true;
  }

  // -------------------------------------------------------------------
  // UI: actualiza los corazones presentes en el DOM.
  // Cualquier botón o ícono con [data-wishlist-toggle="ky-001"] (o sólo
  // [data-wishlist-toggle] si está dentro de un .product-card con
  // data-id) refleja el estado actual.
  // -------------------------------------------------------------------
  function refreshUI() {
    document.querySelectorAll("[data-wishlist-toggle]").forEach(function (el) {
      var id = el.getAttribute("data-wishlist-toggle") || el.closest("[data-id]")?.getAttribute("data-id");
      if (!id) return;
      var active = has(id);
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-pressed", active ? "true" : "false");
      var label = el.getAttribute("data-label-on") || "Quitar de la lista de deseos";
      var labelOff = el.getAttribute("data-label-off") || "Agregar a la lista de deseos";
      el.setAttribute("aria-label", active ? label : labelOff);
    });

    // Badge en la navbar
    var badge = document.getElementById("wishlist-badge");
    if (badge) {
      var n = state.length;
      if (n > 0) {
        badge.textContent = n;
        badge.removeAttribute("hidden");
      } else {
        badge.setAttribute("hidden", "");
      }
    }
  }

  // -------------------------------------------------------------------
  // Bootstrap
  // -------------------------------------------------------------------
  function init() {
    // Click delegado: cualquier elemento con data-wishlist-toggle.
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-wishlist-toggle]");
      if (!btn) return;
      e.preventDefault();
      // Si no trae el id en el atributo, lo buscamos en la tarjeta padre.
      var id = btn.getAttribute("data-wishlist-toggle");
      if (!id) {
        var card = btn.closest("[data-id]");
        id = card ? card.getAttribute("data-id") : null;
      }
      if (!id) return;
      toggle(id);
      refreshUI();
    });

    // Re-sincronizar cuando otras partes del código agreguen tarjetas.
    // products.js dispara un evento custom 'kyro:products-rendered'.
    document.addEventListener("kyro:products-rendered", refreshUI);
    document.addEventListener("DOMContentLoaded", refreshUI);

    refreshUI();
  }

  // API pública
  window.KYROWishlist = {
    init: init,
    toggle: toggle,
    has: has,
    list: list,
    clear: clear,
    refreshUI: refreshUI
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
