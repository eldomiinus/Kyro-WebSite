import { ArrowDown, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { type CSSProperties, useState } from "react";
import catMark from "../../Images/Cat - Rojo v2.png";
import wordmark from "../../Images/Kyro Store.png";
import { scrollToId } from "../utils/navigation";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ "--mx": `${pointer.x}%`, "--my": `${pointer.y}%` } as CSSProperties}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100
        });
      }}
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-scanline" aria-hidden="true" />

      <motion.div
        className="hero-copy"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(16px)" }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-kicker">
          <Sparkles size={15} />
          <span>Alternative wear / Tokyo signal / Handmade energy</span>
        </div>

        <img className="hero-wordmark" src={wordmark} alt="Kyro Store" />
        <h1>KYRO</h1>
        <p className="hero-jp" lang="ja">
          衣装を通し、自己表現の一部であれ。
        </p>
        <p className="hero-description">
          Ropa y accesorios alternativos para transformar la vestimenta en identidad:
          streetwear, Y2K, techwear, cultura japonesa y piezas personales hechas a mano.
        </p>

        <div className="hero-cta">
          <button className="magnetic-button primary" type="button" onClick={() => scrollToId("shop")}>
            Explorar drop
            <ArrowDown size={18} />
          </button>
          <button className="magnetic-button secondary" type="button" onClick={() => scrollToId("manifesto")}>
            Conocer historia
          </button>
        </div>
      </motion.div>

      <motion.div
        className="hero-mark"
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.86, rotate: -6 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={catMark} alt="" />
      </motion.div>

      <div className="spline-frame" aria-hidden="true">
        <spline-viewer url="https://prod.spline.design/BCQTO-gZrrdxeHzo/scene.splinecode" />
      </div>

      <div className="hero-meta" aria-label="Informacion de marca">
        <span>01 / comunidad creativa</span>
        <span>hecho a mano + curaduria alternativa</span>
      </div>
    </section>
  );
}
