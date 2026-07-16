/* =====================================================================
   KYRO — cart.js
   Side-cart deslizante. Mantiene un estado en localStorage para
   persistir el carrito entre recargas. La integración con un backend
   se hace reemplazando las funciones save/load o sumando un POST
   al checkout.
   ===================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "kyro:cart";

  /** Estado: array de { id, name, price, image, qty } */
  var state = load();

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* sin localStorage: estado sólo en memoria */ }
  }

  function count() {
    return state.reduce(function (acc, item) { return acc + item.qty; }, 0);
  }

  function total() {
    return state.reduce(function (acc, item) { return acc + item.price * item.qty; }, 0);
  }

  function add(productId, qty) {
    qty = qty || 1;
    var product = KYRO.getProduct(productId);
    if (!product) return;
    var existing = state.find(function (i) { return i.id === productId; });
    if (existing) {
      existing.qty += qty;
    } else {
      state.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: qty
      });
    }
    save();
    render();
    updateBadge();
    open();
  }

  function remove(productId) {
    state = state.filter(function (i) { return i.id !== productId; });
    save();
    render();
    updateBadge();
  }

  function setQty(productId, qty) {
    var item = state.find(function (i) { return i.id === productId; });
    if (!item) return;
    item.qty = Math.max(1, qty);
    save();
    render();
    updateBadge();
  }

  function clear() {
    state = [];
    save();
    render();
    updateBadge();
  }

  // -------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------
  function render() {
    var cart = document.getElementById("side-cart");
    if (!cart) return;

    var itemsHTML = state.length
      ? state.map(function (i) {
          return ''
            + '<li class="side-cart-item">'
            +   '<img src="' + i.image + '" alt="' + i.name + '" />'
            +   '<div>'
            +     '<div class="side-cart-item-title">' + i.name + '</div>'
            +     '<div class="side-cart-item-price">' + KYRO.formatPrice(i.price) + '</div>'
            +     '<div class="qty-control">'
            +       '<button type="button" data-qty-down="' + i.id + '" aria-label="Restar">−</button>'
            +       '<span>' + i.qty + '</span>'
            +       '<button type="button" data-qty-up="' + i.id + '" aria-label="Sumar">+</button>'
            +     '</div>'
            +   '</div>'
            +   '<button type="button" class="side-cart-item-remove" data-remove="' + i.id + '">Quitar</button>'
            + '</li>';
        }).join("")
      : '<p class="side-cart-empty">Tu carrito está vacío.</p>';

    cart.innerHTML = ''
      + '<header class="side-cart-header">'
      +   '<h2>Tu carrito</h2>'
      +   '<button type="button" class="side-cart-close" id="close-cart" aria-label="Cerrar carrito">×</button>'
      + '</header>'
      + '<ul class="side-cart-items">' + itemsHTML + '</ul>'
      + '<footer class="side-cart-footer">'
      +   '<div class="side-cart-total">'
      +     '<span>Total</span>'
      +     '<span>' + KYRO.formatPrice(total()) + '</span>'
      +   '</div>'
      +   '<button class="btn-primary side-cart-checkout" type="button" id="checkout-btn" ' + (state.length ? "" : "disabled") + '>'
      +     'Finalizar compra'
      +   '</button>'
      + '</footer>';

    // Listeners del render actual
    cart.querySelector("#close-cart")?.addEventListener("click", close);

    cart.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () { remove(btn.getAttribute("data-remove")); });
    });
    cart.querySelectorAll("[data-qty-up]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-qty-up");
        var item = state.find(function (i) { return i.id === id; });
        if (item) setQty(id, item.qty + 1);
      });
    });
    cart.querySelectorAll("[data-qty-down]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-qty-down");
        var item = state.find(function (i) { return i.id === id; });
        if (item) setQty(id, item.qty - 1);
      });
    });

    var checkout = document.getElementById("checkout-btn");
    if (checkout) {
      checkout.addEventListener("click", function () {
        // Integración con backend: POST /api/orders con state.
        alert("Pedido simulado. Acá se conectará al backend.");
      });
    }
  }

  function updateBadge() {
    var badge = document.getElementById("cart-badge");
    if (!badge) return;
    var n = count();
    if (n > 0) {
      badge.textContent = n;
      badge.removeAttribute("hidden");
    } else {
      badge.setAttribute("hidden", "");
    }
  }

  // -------------------------------------------------------------------
  // Apertura / cierre
  // -------------------------------------------------------------------
  function open() {
    render();
    var cart = document.getElementById("side-cart");
    var overlay = document.getElementById("cart-overlay");
    if (!cart || !overlay) return;
    cart.classList.add("is-open");
    cart.setAttribute("aria-hidden", "false");
    overlay.removeAttribute("hidden");
    requestAnimationFrame(function () { overlay.classList.add("is-visible"); });
  }

  function close() {
    var cart = document.getElementById("side-cart");
    var overlay = document.getElementById("cart-overlay");
    if (!cart || !overlay) return;
    cart.classList.remove("is-open");
    cart.setAttribute("aria-hidden", "true");
    overlay.classList.remove("is-visible");
    setTimeout(function () { overlay.setAttribute("hidden", ""); }, 200);
  }

  // -------------------------------------------------------------------
  // Bootstrap: enlazar botones genéricos y el overlay
  // -------------------------------------------------------------------
  function init() {
    // Cerrar al clickear overlay
    var overlay = document.getElementById("cart-overlay");
    if (overlay) overlay.addEventListener("click", close);

    // Cerrar con tecla Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    // Botones "Agregar al carrito" creados dinámicamente en cualquier
    // lugar de la página (data-add-to-cart="ky-001").
    document.addEventListener("click", function (e) {
      var target = e.target.closest("[data-add-to-cart]");
      if (!target) return;
      e.preventDefault();
      add(target.getAttribute("data-add-to-cart"), 1);
    });

    // Render inicial y badge
    render();
    updateBadge();
  }

  // API pública
  window.KYROCart = {
    init: init,
    open: open,
    close: close,
    add: add,
    remove: remove,
    setQty: setQty,
    clear: clear,
    count: count,
    total: total,
    state: function () { return state.slice(); }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
