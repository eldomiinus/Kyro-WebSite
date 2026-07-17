/* =====================================================================
   KYRO — wishlist-page.js
   Render de la página /pages/wishlist.html
   Lee los IDs almacenados en KYROWishlist y muestra las tarjetas
   correspondientes usando KYROProducts.productCard().
   ===================================================================== */

(function () {
  "use strict";

  function render() {
    var grid = document.getElementById("wishlist-grid");
    if (!grid) return;

    var ids = (window.KYROWishlist && window.KYROWishlist.list) ? window.KYROWishlist.list() : [];
    var countEl = document.getElementById("wishlist-count");
    var emptyEl = document.getElementById("wishlist-empty");

    if (!ids.length) {
      grid.innerHTML = "";
      if (countEl) countEl.textContent = "0 productos guardados.";
      if (emptyEl) emptyEl.removeAttribute("hidden");
      return;
    }

    if (emptyEl) emptyEl.setAttribute("hidden", "");

    // Mapeamos ids -> productos completos y descartamos los que ya no existen.
    var items = ids
      .map(function (id) { return KYRO.getProduct(id); })
      .filter(function (p) { return p !== null; });

    if (!items.length) {
      grid.innerHTML = "";
      if (emptyEl) emptyEl.removeAttribute("hidden");
      return;
    }

    if (countEl) {
      countEl.textContent = items.length + " producto" + (items.length === 1 ? "" : "s") + " en tu lista.";
    }

    grid.innerHTML = items.map(function (p) {
      return window.KYROProducts.productCard(p, true);
    }).join("");

    // Sincronizar el estado de los corazones.
    if (window.KYROWishlist) window.KYROWishlist.refreshUI();
  }

  function init() {
    render();

    // Re-renderizar cuando la wishlist cambie desde otra pestaña / acción.
    document.addEventListener("kyro:products-rendered", render);
    document.addEventListener("kyro:wishlist-changed", render);

    // Botón "Vaciar lista"
    var clearBtn = document.getElementById("clear-wishlist");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        if (confirm("¿Vaciar la lista de deseos?")) {
          window.KYROWishlist.clear();
          render();
        }
      });
    }
  }

  // Re-render automático cada vez que wishlist.js hace toggle.
  // Para mantener el acoplamiento cero, escuchamos el evento de UI:
  // wishlist.js ya emite updates via refreshUI(); agregamos un hook
  // custom cuando clear/toggle se ejecutan.
  (function patchWishlistEvents() {
    var origToggle = window.KYROWishlist && window.KYROWishlist.toggle;
    var origClear = window.KYROWishlist && window.KYROWishlist.clear;
    // Las funciones existen desde la carga de wishlist.js, por eso
    // las wrapeamos al inicio.
    function fire() {
      document.dispatchEvent(new CustomEvent("kyro:wishlist-changed"));
    }
    document.addEventListener("DOMContentLoaded", function () {
      if (window.KYROWishlist) {
        var t = window.KYROWishlist.toggle;
        var c = window.KYROWishlist.clear;
        if (t && !t.__patched) {
          window.KYROWishlist.toggle = function () {
            var r = t.apply(this, arguments);
            fire();
            return r;
          };
          window.KYROWishlist.toggle.__patched = true;
        }
        if (c && !c.__patched) {
          window.KYROWishlist.clear = function () {
            var r = c.apply(this, arguments);
            fire();
            return r;
          };
          window.KYROWishlist.clear.__patched = true;
        }
      }
    });
  })();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
