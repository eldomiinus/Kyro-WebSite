import { Heart, Instagram, Mail, ShoppingBag } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import wordmark from "../assets/images/Kyro Store.png";
import { scrollToId } from "../utils/navigation";

type HeaderProps = {
  cartCount: number;
  favoriteCount: number;
  onOpenCart: () => void;
};

export function Header({ cartCount, favoriteCount, onOpenCart }: HeaderProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <header className="site-header">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <button className="brand-lockup" onClick={() => scrollToId("hero")} aria-label="Volver al inicio">
        <img src={wordmark} alt="Kyro Store" />
      </button>

      <nav className="header-nav" aria-label="Secciones principales">
        <button onClick={() => scrollToId("manifesto")}>Identidad</button>
        <button onClick={() => scrollToId("craft")}>Proceso</button>
        <button onClick={() => scrollToId("shop")}>Drop</button>
      </nav>

      <div className="header-actions">
        <a
          className="icon-button"
          href="https://www.instagram.com/kyroshop.exe/?hl=es"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir Instagram de Kyro"
        >
          <Instagram size={18} />
        </a>
        <a className="icon-button" href="mailto:kyroshop.exe@gmail.com" aria-label="Enviar mail a Kyro">
          <Mail size={18} />
        </a>
        <button className="icon-button counter-button" type="button" aria-label="Favoritos guardados">
          <Heart size={18} />
          {favoriteCount > 0 ? <span>{favoriteCount}</span> : null}
        </button>
        <button className="icon-button counter-button" type="button" onClick={onOpenCart} aria-label="Abrir carrito">
          <ShoppingBag size={18} />
          {cartCount > 0 ? <span>{cartCount}</span> : null}
        </button>
      </div>
    </header>
  );
}
