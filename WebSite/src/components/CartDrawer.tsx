import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import type { CartItem, Product } from "../types";
import { formatPrice } from "../utils/format";

type CartDrawerProps = {
  isOpen: boolean;
  cart: CartItem[];
  products: Product[];
  onClose: () => void;
  onChangeQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: () => void;
};

export function CartDrawer({
  isOpen,
  cart,
  products,
  onClose,
  onChangeQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const lines = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean) as Array<CartItem & { product: Product }>,
    [cart, products]
  );

  const total = lines.reduce((sum, item) => sum + item.product.priceArs * item.quantity, 0);
  const itemCount = lines.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="drawer-shell"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
        >
          <button className="drawer-backdrop" type="button" aria-label="Cerrar carrito" onClick={onClose} />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={shouldReduceMotion ? false : { x: "100%" }}
            animate={shouldReduceMotion ? undefined : { x: 0 }}
            exit={shouldReduceMotion ? undefined : { x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="drawer-header">
              <div>
                <span>Kyro cart</span>
                <h2 id="cart-title">Carrito</h2>
              </div>
              <button ref={closeButtonRef} className="icon-button" type="button" onClick={onClose} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>

            {lines.length > 0 ? (
              <div className="cart-lines">
                {lines.map((item) => (
                  <article className="cart-line" key={`${item.productId}-${item.size}`}>
                    <img src={item.product.image} alt="" />
                    <div className="cart-line-copy">
                      <span>{item.product.category}</span>
                      <h3>{item.product.name}</h3>
                      <p>
                        Talle {item.size} / {formatPrice(item.product.priceArs)}
                      </p>
                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() => onChangeQuantity(item.productId, item.size, -1)}
                          aria-label={`Restar ${item.product.name}`}
                        >
                          <Minus size={15} />
                        </button>
                        <strong>{item.quantity}</strong>
                        <button
                          type="button"
                          onClick={() => onChangeQuantity(item.productId, item.size, 1)}
                          aria-label={`Sumar ${item.product.name}`}
                        >
                          <Plus size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.productId, item.size)}
                          aria-label={`Eliminar ${item.product.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="drawer-empty">
                <ShoppingBag size={26} />
                <h3>Tu carrito esta vacio.</h3>
                <p>Agrega piezas del drop para armar un pedido demo.</p>
              </div>
            )}

            <div className="drawer-footer">
              <div>
                <span>{itemCount} items</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className="magnetic-button primary" type="button" onClick={onCheckout} disabled={lines.length === 0}>
                Consultar pedido
                <Send size={18} />
              </button>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
