import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, ShoppingBag, Sparkles, X } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

type QuickViewProps = {
  product: Product | null;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
};

export function QuickView({ product, isFavorite, onClose, onToggleFavorite, onAddToCart }: QuickViewProps) {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    setSelectedSize(product?.sizes[0] ?? "");
  }, [product]);

  useEffect(() => {
    if (!product) return;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, product]);

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="modal-shell"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
        >
          <button className="modal-backdrop" type="button" aria-label="Cerrar vista rapida" onClick={onClose} />
          <motion.section
            className="quick-view"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            style={
              {
                "--card-accent": product.palette[0],
                "--card-accent-2": product.palette[1]
              } as CSSProperties
            }
            initial={shouldReduceMotion ? false : { y: 34, scale: 0.96, filter: "blur(16px)" }}
            animate={shouldReduceMotion ? undefined : { y: 0, scale: 1, filter: "blur(0px)" }}
            exit={shouldReduceMotion ? undefined : { y: 20, scale: 0.97, filter: "blur(12px)" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <button ref={closeButtonRef} className="icon-button modal-close" type="button" onClick={onClose} aria-label="Cerrar">
              <X size={18} />
            </button>

            <div className="quick-view-media">
              <img src={product.image} alt={`Vista editorial de ${product.name}`} />
              <span>{product.stockStatus}</span>
            </div>

            <div className="quick-view-copy">
              <div className="section-label">
                <span>{product.category}</span>
                <span>{product.handmade ? "hecho a mano" : "curado por Kyro"}</span>
              </div>
              <h2 id="quick-view-title">{product.name}</h2>
              <strong>{formatPrice(product.priceArs)}</strong>
              <p>{product.description}</p>

              <div className="size-row" aria-label="Seleccionar talle">
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    className={selectedSize === size ? "active" : ""}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="quick-tags">
                {product.tags.map((tag) => (
                  <span key={tag}>
                    <Sparkles size={13} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="quick-actions">
                <button
                  className="magnetic-button primary"
                  type="button"
                  onClick={() => onAddToCart(product, selectedSize)}
                  disabled={product.stockStatus === "Proximamente"}
                >
                  <ShoppingBag size={18} />
                  {product.stockStatus === "Proximamente" ? "Proximamente" : "Agregar al carrito"}
                </button>
                <button
                  className="magnetic-button secondary"
                  type="button"
                  onClick={() => onToggleFavorite(product.id)}
                  aria-pressed={isFavorite}
                >
                  <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                  Favorito
                </button>
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
