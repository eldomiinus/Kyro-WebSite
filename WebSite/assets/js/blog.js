/* =====================================================================
   KYRO — blog.js
   Render del feed de artículos del blog.
   La fuente de datos es KYRO.articles (definida en data.js).
   Si no hay datos, se cargan placeholders para que el sitio no quede
   vacío mientras se escribe el primer artículo.
   ===================================================================== */

(function () {
  "use strict";

  // Placeholders de artículos. Cuando exista backend se reemplaza por
  // una API; mientras tanto aseguramos que la grilla tenga contenido.
  var PLACEHOLDERS = [
    {
      id: "post-1",
      title: "Lanzamiento del sitio web",
      date: "2026-07-15",
      excerpt: "Estrenamos la primera versión pública de la página de Kyro: un esqueleto abierto, modular y bajo licencia MIT. Te contamos qué hay adentro y qué viene.",
      image: "assets/img/placeholder.svg"
    },
    {
      id: "post-2",
      title: "Nuevo drop: Remera Cat Rojo v2",
      date: "2026-07-10",
      excerpt: "Llegó la segunda versión de nuestra remera insignia. Mismo gato, mejor textil y un desglose de costos más detallado que nunca.",
      image: "assets/img/placeholder.svg"
    },
    {
      id: "post-3",
      title: "Cómo se imprime una estampa en casa",
      date: "2026-07-01",
      excerpt: "Una guía corta con los materiales necesarios para transferir nuestros diseños libres a cualquier prenda, sin necesidad de taller.",
      image: "assets/img/placeholder.svg"
    },
    {
      id: "post-4",
      title: "Transparencia: por qué publicamos los costos",
      date: "2026-06-22",
      excerpt: "Mostrar el costo real no es una moda, es un compromiso. Acá explicamos por qué elegimos desglosar cada precio en la página del producto.",
      image: "assets/img/placeholder.svg"
    },
    {
      id: "post-5",
      title: "Comunidad abierta: cómo enviar tu aporte",
      date: "2026-06-12",
      excerpt: "Sumá tu foto, tu versión modificada o un tutorial al muro de la comunidad. Te contamos el flujo de publicación paso a paso.",
      image: "assets/img/placeholder.svg"
    },
    {
      id: "post-6",
      title: "Hoja de ruta: hacia dónde va Kyro",
      date: "2026-06-01",
      excerpt: "Sistema de cuentas, integración con pagos y un editor de diseños en el navegador. Estas son las próximas piezas que estamos armando.",
      image: "assets/img/placeholder.svg"
    }
  ];

  function getArticles() {
    // Priorizamos los artículos reales; si no hay, devolvemos placeholders.
    if (window.KYRO && Array.isArray(window.KYRO.articles) && window.KYRO.articles.length) {
      return window.KYRO.articles;
    }
    return PLACEHOLDERS;
  }

  /**
   * Formatea una fecha "YYYY-MM-DD" a algo legible en es-AR sin
   * depender de Intl (para mantener el sitio portable).
   */
  function formatDate(iso) {
    if (!iso) return "";
    var parts = iso.split("-");
    if (parts.length !== 3) return iso;
    var months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    var m = parseInt(parts[1], 10) - 1;
    return parseInt(parts[2], 10) + " " + (months[m] || "") + " " + parts[0];
  }

  function articleCard(a) {
    return ''
      + '<article class="article-card" data-id="' + a.id + '">'
      +   '<img class="article-card-image" src="' + a.image + '" alt="' + a.title + '" loading="lazy" />'
      +   '<div class="article-card-body">'
      +     '<span class="article-card-meta">' + formatDate(a.date) + (a.author ? ' · ' + a.author : '') + '</span>'
      +     '<h2 class="article-card-title">' + a.title + '</h2>'
      +     '<p class="article-card-excerpt">' + a.excerpt + '</p>'
      +     '<a class="article-card-link" href="#' + a.id + '">Leer más →</a>'
      +   '</div>'
      + '</article>';
  }

  function render() {
    var grid = document.getElementById("blog-grid");
    if (!grid) return;
    var items = getArticles();
    if (!items.length) {
      grid.innerHTML = "";
      var empty = document.getElementById("blog-empty");
      if (empty) empty.removeAttribute("hidden");
      return;
    }
    grid.innerHTML = items.map(articleCard).join("");
  }

  window.KYROBlog = { render: render, formatDate: formatDate };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
