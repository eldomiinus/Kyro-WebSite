import Lenis from "@studio-freight/lenis";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BrandStory } from "./components/BrandStory";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Marketplace } from "./components/Marketplace";
import { QuickView } from "./components/QuickView";
import { products } from "./data/products";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { CartItem, Product } from "./types";
import { formatPrice } from "./utils/format";

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [favorites, setFavorites] = useLocalStorage<string[]>("kyro:favorites", []);
  const [cart, setCart] = useLocalStorage<CartItem[]>("kyro:cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const toggleFavorite = (productId: string) => {
    setFavorites((current) =>
      current.includes(productId) ? current.filter((item) => item !== productId) : [...current, productId]
    );
  };

  const addToCart = (product: Product, size: string) => {
    if (product.stockStatus === "Proximamente") return;

    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id && item.size === size);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { productId: product.id, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const changeQuantity = (productId: string, size: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: string, size: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId || item.size !== size));
  };

  const checkoutByEmail = () => {
    const lines = cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        if (!product) return null;
        return `- ${product.name} / talle ${item.size} / x${item.quantity} / ${formatPrice(
          product.priceArs * item.quantity
        )}`;
      })
      .filter(Boolean)
      .join("\n");

    const subject = encodeURIComponent("Consulta de pedido Kyro");
    const body = encodeURIComponent(`Hola Kyro,\n\nQuiero consultar por este pedido demo:\n${lines}\n\nGracias.`);
    window.location.href = `mailto:kyroshop.exe@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      className="app-shell"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <Header cartCount={cartCount} favoriteCount={favorites.length} onOpenCart={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <BrandStory />
        <Marketplace
          products={products}
          favorites={favorites}
          cartCount={cartCount}
          onToggleFavorite={toggleFavorite}
          onAddToCart={addToCart}
          onQuickView={setQuickViewProduct}
          onOpenCart={() => setIsCartOpen(true)}
        />
      </main>

      <footer className="site-footer">
        <div>
          <strong>Kyro.exe</strong>
          <span>Crear, vestir, compartir.</span>
        </div>
        <div>
          <a href="https://www.instagram.com/kyroshop.exe/?hl=es" target="_blank" rel="noreferrer">
            Instagram
            <ArrowUpRight size={15} />
          </a>
          <a href="mailto:kyroshop.exe@gmail.com">
            Mail
            <ArrowUpRight size={15} />
          </a>
          <a href="https://github.com/eldomiinus" target="_blank" rel="noreferrer">
            @eldomiinus
            <ArrowUpRight size={15} />
          </a>
        </div>
      </footer>

      <QuickView
        product={quickViewProduct}
        isFavorite={quickViewProduct ? favorites.includes(quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onToggleFavorite={toggleFavorite}
        onAddToCart={addToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        products={products}
        onClose={() => setIsCartOpen(false)}
        onChangeQuantity={changeQuantity}
        onRemoveItem={removeItem}
        onCheckout={checkoutByEmail}
      />
    </motion.div>
  );
}
