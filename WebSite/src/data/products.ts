import catMark from "../../Images/Cat - Rojo v2.png";
import phoneOne from "../../Images/iPhone 12 Pro 1.png";
import phoneTwo from "../../Images/iPhone 12 Pro 2.png";
import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "kyro-void-hoodie",
    name: "Void Layer Hoodie",
    category: "Prendas",
    priceArs: 42000,
    image: phoneTwo,
    palette: ["#20f5ff", "#ff3fd1"],
    tags: ["streetwear", "cyberpunk", "oversize"],
    sizes: ["S", "M", "L", "XL"],
    badge: "Drop 01",
    handmade: true,
    description:
      "Hoodie oscuro de silueta amplia con intervenciones graficas, pensado para looks alternativos de alto contraste.",
    stockStatus: "Ultimas unidades"
  },
  {
    id: "kyro-signal-chain",
    name: "Signal Chain",
    category: "Accesorios",
    priceArs: 14500,
    image: catMark,
    palette: ["#ff1515", "#f7f7fb"],
    tags: ["visual kei", "harajuku", "handmade"],
    sizes: ["Unico"],
    badge: "Hecho a mano",
    handmade: true,
    description:
      "Cadena modular con presencia roja Kyro, creada para sumar tension visual a prendas negras o denim.",
    stockStatus: "Disponible"
  },
  {
    id: "kyro-neo-skirt",
    name: "Neo Pleat Skirt",
    category: "Prendas",
    priceArs: 36000,
    image: phoneOne,
    palette: ["#8c5cff", "#20f5ff"],
    tags: ["y2k", "gyaru", "japan"],
    sizes: ["XS", "S", "M", "L"],
    handmade: false,
    description:
      "Falda de tablas con lectura Y2K y detalles de contraste para combinar con botas, medias y accesorios pesados.",
    stockStatus: "Disponible"
  },
  {
    id: "kyro-cyber-sleeves",
    name: "Cyber Sleeves",
    category: "Techwear",
    priceArs: 18500,
    image: catMark,
    palette: ["#20f5ff", "#0b0c10"],
    tags: ["techwear", "anime", "layering"],
    sizes: ["S/M", "L/XL"],
    badge: "Modular",
    handmade: true,
    description:
      "Mangas desmontables para construir capas sin perder movilidad. Brillan como acento sin dominar el outfit.",
    stockStatus: "Disponible"
  },
  {
    id: "kyro-angel-bag",
    name: "Angel Byte Bag",
    category: "Accesorios",
    priceArs: 28500,
    image: phoneOne,
    palette: ["#ff3fd1", "#f7f7fb"],
    tags: ["otaku", "kawaii", "streetwear"],
    sizes: ["Unico"],
    handmade: true,
    description:
      "Bolso compacto con volumen grafico y guiños a cultura pop japonesa. Ideal para drops, eventos y convenciones.",
    stockStatus: "Proximamente"
  },
  {
    id: "kyro-red-protocol",
    name: "Red Protocol Tee",
    category: "Edicion limitada",
    priceArs: 25500,
    image: catMark,
    palette: ["#ff1515", "#8c5cff"],
    tags: ["limited", "manga", "cyberpunk"],
    sizes: ["S", "M", "L"],
    badge: "Limitado",
    handmade: false,
    description:
      "Remera negra con simbolo Kyro y energia de interfaz futurista. Base simple, identidad fuerte.",
    stockStatus: "Ultimas unidades"
  }
];

export const categories = ["Todos", "Prendas", "Accesorios", "Techwear", "Edicion limitada"] as const;

export const styleTags = [
  "streetwear",
  "cyberpunk",
  "techwear",
  "y2k",
  "harajuku",
  "visual kei",
  "handmade",
  "anime"
] as const;
