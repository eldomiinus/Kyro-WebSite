/* =====================================================================
   KYRO — data.js
   Capa de datos mock. Cuando exista un backend, este archivo será
   reemplazado por fetch() a la API manteniendo la misma estructura
   expuesta en window.KYRO.
   ===================================================================== */

window.KYRO = window.KYRO || {};

/* ---------------------------------------------------------------------
   Catálogo de productos
   Campos:
     id          — identificador único
     name        — nombre visible
     price       — precio final
     category    — 'prenda' | 'accesorio'
     type        — remera | hoodie | buzo | pin | sticker
     description — descripción corta
     image       — ruta a la imagen (assets/img/...)
     costs       — desglose para "Transparencia de Costos"
   --------------------------------------------------------------------- */
KYRO.products = [
  {
    id: "ky-001",
    name: "Remera Cat Rojo",
    price: 4500,
    category: "prenda",
    type: "remera",
    description: "Remera de algodón con estampa serigráfica del gato rojo.",
    image: "assets/img/placeholder.svg",
    costs: {
      base: 1800,        // costo prenda lisa
      ink: 600,          // costo tinta
      labor: 1200,       // horas de trabajo
      fixed: 900         // gastos fijos / envío estimado
    }
  },
  {
    id: "ky-002",
    name: "Hoodie Kyro Print",
    price: 8900,
    category: "prenda",
    type: "hoodie",
    description: "Hoodie con capucha, bolsillo canguro y estampa frontal.",
    image: "assets/img/placeholder.svg",
    costs: {
      base: 4200,
      ink: 800,
      labor: 2200,
      fixed: 1700
    }
  },
  {
    id: "ky-003",
    name: "Buzo Oversize",
    price: 9500,
    category: "prenda",
    type: "buzo",
    description: "Buzo oversize color crudo con estampa en espalda.",
    image: "assets/img/placeholder.svg",
    costs: {
      base: 4500,
      ink: 900,
      labor: 2400,
      fixed: 1700
    }
  },
  {
    id: "ky-004",
    name: "Pin Esmalte Kyro",
    price: 1200,
    category: "accesorio",
    type: "pin",
    description: "Pin metálico esmaltado de 3cm con el logo de Kyro.",
    image: "assets/img/placeholder.svg",
    costs: {
      base: 350,
      ink: 100,
      labor: 350,
      fixed: 400
    }
  },
  {
    id: "ky-005",
    name: "Sticker Pack Open",
    price: 800,
    category: "accesorio",
    type: "sticker",
    description: "Pack de 5 stickers vinílicos con diseños abiertos.",
    image: "assets/img/placeholder.svg",
    costs: {
      base: 200,
      ink: 50,
      labor: 200,
      fixed: 350
    }
  },
  {
    id: "ky-006",
    name: "Remera Crea",
    price: 4500,
    category: "prenda",
    type: "remera",
    description: "Remera negra con la frase 'Crea, usa, comparte'.",
    image: "assets/img/placeholder.svg",
    costs: {
      base: 1800,
      ink: 600,
      labor: 1200,
      fixed: 900
    }
  }
];

/* ---------------------------------------------------------------------
   Galería comunitaria (reemplaza a las reseñas)
   --------------------------------------------------------------------- */
KYRO.community = [
  {
    id: "c-1",
    user: "leo.dev",
    avatar: "assets/img/placeholder.svg",
    image: "assets/img/placeholder.svg",
    caption: "Mi versión de la remera, le agregué parches.",
    date: "2026-06-12"
  },
  {
    id: "c-2",
    user: "ana.print",
    avatar: "assets/img/placeholder.svg",
    image: "assets/img/placeholder.svg",
    caption: "Probé imprimirla en papel para transferir y quedó increíble.",
    date: "2026-07-02"
  },
  {
    id: "c-3",
    user: "mati.serigraphy",
    avatar: "assets/img/placeholder.svg",
    image: "assets/img/placeholder.svg",
    caption: "Serigrafiada a 3 colores. Manden feedback :)",
    date: "2026-07-08"
  },
  {
    id: "c-4",
    user: "sof.costura",
    avatar: "assets/img/placeholder.svg",
    image: "assets/img/placeholder.svg",
    caption: "Mi taller está lleno de Kyros estos días.",
    date: "2026-07-11"
  }
];

/* ---------------------------------------------------------------------
   Recursos open source
   --------------------------------------------------------------------- */
KYRO.resources = [
  {
    id: "r-1",
    name: "Pack stickers base (.svg)",
    description: "5 archivos SVG vectoriales listos para imprimir.",
    size: "320 KB",
    format: "SVG",
    url: "#"
  },
  {
    id: "r-2",
    name: "Estampa Cat Rojo (alta resolución)",
    description: "PNG a 300dpi para serigrafía.",
    size: "8.4 MB",
    format: "PNG",
    url: "#"
  },
  {
    id: "r-3",
    name: "Logo Kyro (variantes)",
    description: "Versiones clara, oscura y monocromática.",
    size: "1.1 MB",
    format: "ZIP",
    url: "#"
  },
  {
    id: "r-4",
    name: "Tipografía Kyro Display",
    description: "Fuente libre para uso comercial bajo MIT.",
    size: "220 KB",
    format: "OTF",
    url: "#"
  }
];

/* ---------------------------------------------------------------------
   Helpers de acceso
   --------------------------------------------------------------------- */
KYRO.getProduct = function (id) {
  return KYRO.products.find(function (p) { return p.id === id; }) || null;
};

KYRO.formatPrice = function (value) {
  // Formato simple: "AR$ 4.500" (sin dependencia de Intl para mantenerlo
  // portable; cuando exista backend se puede internacionalizar).
  return "AR$ " + Number(value).toLocaleString("es-AR");
};
