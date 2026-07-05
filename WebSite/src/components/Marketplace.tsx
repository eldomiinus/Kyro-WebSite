import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Eye,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkle,
  X
} from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { categories, styleTags } from "../data/products";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

type SortMode = "featured" | "price-asc" | "price-desc" | "handmade";

type MarketplaceProps = {
  products: Product[];
  favorites: string[];
  cartCount: number;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
  onOpenCart: () => void;
};

export function Marketplace({
  products,
  favorites,
  cartCount,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
  onOpenCart
}: MarketplaceProps) {
  const shouldReduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Todos");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortMode>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products
      .filter((product) => activeCategory === "Todos" || product.category === activeCategory)
      .filter((product) => {
        if (!normalizedQuery) return true;

        return [product.name, product.category, product.description, ...product.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .filter((product) =>
        activeTags.length === 0 ? true : activeTags.every((tag) => product.tags.includes(tag))
      )
      .sort((a, b) => {
        if (sort === "price-asc") return a.priceArs - b.priceArs;
        if (sort === "price-desc") return b.priceArs - a.priceArs;
        if (sort === "handmade") return Number(b.handmade) - Number(a.handmade);
        return 0;
      });
  }, [activeCategory, activeTags, products, query, sort]);

  const toggleTag = (tag: string) => {
    setActiveTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  };

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("Todos");
    setActiveTags([]);
    setSort("featured");
  };

  return (
    <section id="shop" className="shop-section section-pad">
      <div className="shop-heading">
        <div>
          <div className="section-label">
            <span>Marketplace</span>
            <span>drop demo / ARS</span>
          </div>
          <h2>Explora el drop como si fuera una interfaz de moda alternativa.</h2>
        </div>
        <button className="magnetic-button secondary cart-shortcut" type="button" onClick={onOpenCart}>
          <ShoppingBag size={18} />
          Carrito
          {cartCount > 0 ? <span>{cartCount}</span> : null}
        </button>
      </div>

      <div className="shop-toolbar">
        <label className="search-box">
          <Search size={18} />
          <span className="sr-only">Buscar productos</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por prenda, estetica o tag"
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} aria-label="Limpiar busqueda">
              <X size={16} />
            </button>
          ) : null}
        </label>

        <button className="filter-toggle" type="button" onClick={() => setFiltersOpen((value) => !value)}>
          <SlidersHorizontal size={18} />
          Filtros
        </button>

        <label className="sort-select">
          <span>Orden</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
            <option value="featured">Curaduria Kyro</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="handmade">Hecho a mano primero</option>
          </select>
        </label>
      </div>

      <div className="category-row" aria-label="Categorias de producto">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {filtersOpen ? (
          <motion.div
            className="filter-panel"
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
          >
            <div className="tag-grid" aria-label="Filtros por estilo">
              {styleTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={activeTags.includes(tag) ? "active" : ""}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={activeTags.includes(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="shop-meta">
        <span>{filteredProducts.length} piezas visibles</span>
        <button type="button" onClick={clearFilters}>
          Reset
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <motion.div className="product-grid" layout>
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="empty-state">
          <Sparkle size={24} />
          <h3>No hay piezas con esos filtros.</h3>
          <p>Resetea la busqueda o combina menos tags para volver al drop completo.</p>
          <button className="magnetic-button primary" type="button" onClick={clearFilters}>
            Ver todo
          </button>
        </div>
      )}
    </section>
  );
}

type ProductCardProps = {
  product: Product;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
};

function ProductCard({
  product,
  index,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onQuickView
}: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isComingSoon = product.stockStatus === "Proximamente";

  return (
    <motion.article
      className="product-card"
      style={
        {
          "--card-accent": product.palette[0],
          "--card-accent-2": product.palette[1]
        } as CSSProperties
      }
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: "blur(12px)" }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
      whileHover={shouldReduceMotion ? undefined : { y: -6, rotateX: 1.5, rotateY: -1.5 }}
    >
      <div className="product-visual">
        <img src={product.image} alt={`Vista editorial de ${product.name}`} />
        <span className="stock-badge">{product.badge ?? product.stockStatus}</span>
        <button
          className={isFavorite ? "favorite-button active" : "favorite-button"}
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-label={isFavorite ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`}
          aria-pressed={isFavorite}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-info">
        <div>
          <p>{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <strong>{formatPrice(product.priceArs)}</strong>
      </div>

      <div className="product-tags">
        {product.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="product-actions">
        <button type="button" onClick={() => onQuickView(product)}>
          <Eye size={17} />
          Quick view
        </button>
        <button
          type="button"
          onClick={() => onAddToCart(product, product.sizes[0])}
          disabled={isComingSoon}
        >
          <ShoppingBag size={17} />
          {isComingSoon ? "Pronto" : "Agregar"}
        </button>
      </div>
    </motion.article>
  );
}
