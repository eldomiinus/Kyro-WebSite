import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Gem, Layers3, Paintbrush, RadioTower } from "lucide-react";
import catMark from "../../Images/Cat - Rojo v2.png";
import phoneOne from "../../Images/iPhone 12 Pro 1.png";
import phoneTwo from "../../Images/iPhone 12 Pro 2.png";
import { scrollToId } from "../utils/navigation";

const reveal = {
  hidden: { opacity: 0, y: 32, filter: "blur(14px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

const pillars = [
  {
    icon: Paintbrush,
    label: "Intervencion",
    text: "Prendas y accesorios pensados como soporte de expresion personal."
  },
  {
    icon: Layers3,
    label: "Capas",
    text: "Siluetas negras, contraste grafico y piezas modulares para combinar."
  },
  {
    icon: RadioTower,
    label: "Senal",
    text: "Cyberpunk, Harajuku, Visual Kei, anime y cultura pop japonesa como lenguaje."
  }
];

const cultureTags = ["Techwear", "Y2K", "Cyberpunk", "Harajuku", "Gyaru", "Otaku", "Visual Kei", "Streetwear"];

export function BrandStory() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.35 },
        variants: reveal,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
      };

  return (
    <>
      <section id="manifesto" className="manifesto-section section-pad">
        <motion.div className="section-label" {...motionProps}>
          <span>Manifesto</span>
          <span>Kyro.exe</span>
        </motion.div>
        <motion.div className="manifesto-layout" {...motionProps}>
          <h2>
            Vestirse tambien puede ser una forma de crear comunidad, ruido visual y presencia propia.
          </h2>
          <p>
            Kyro nace como un proyecto personal de ropa y accesorios alternativos. No busca parecer una tienda
            generica: busca que cada drop se sienta como una pieza de identidad, hecha desde la creatividad y para
            personas que se reconocen en esteticas fuera del centro.
          </p>
        </motion.div>
        <div className="marquee" aria-hidden="true">
          <div>
            <span>CYBERPUNK</span>
            <span>JAPAN MODERN</span>
            <span>STREET SIGNAL</span>
            <span>HANDMADE</span>
            <span>KYRO</span>
          </div>
        </div>
      </section>

      <section id="craft" className="craft-section section-pad">
        <motion.div className="craft-visual" {...motionProps}>
          <img className="craft-cat" src={catMark} alt="Isotipo rojo de Kyro" />
          <div className="craft-code" aria-hidden="true">
            <span>ALT-UNIFORM / 030305</span>
            <span>DROP SIGNAL: ACTIVE</span>
            <span>HANDCRAFTED_LAYER=true</span>
          </div>
        </motion.div>

        <div className="craft-copy">
          <motion.div className="section-label" {...motionProps}>
            <span>Proceso</span>
            <span>01: hecho con manos</span>
          </motion.div>
          <motion.h2 {...motionProps}>Piezas con caracter antes que volumen.</motion.h2>
          <motion.p {...motionProps}>
            Muchas prendas se confeccionan o intervienen artesanalmente. Esa escala chica no se oculta: es parte de
            la identidad. Kyro se siente mas cercano a un estudio creativo que a una cadena de fast fashion.
          </motion.p>
          <div className="pillar-grid">
            {pillars.map((pillar, index) => (
              <motion.article
                className="story-card"
                key={pillar.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
              >
                <pillar.icon size={20} />
                <h3>{pillar.label}</h3>
                <p>{pillar.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="culture-section section-pad">
        <motion.div className="culture-copy" {...motionProps}>
          <div className="section-label">
            <span>Estetica</span>
            <span>minimalismo oscuro + neon controlado</span>
          </div>
          <h2>Una interfaz negra, afilada y limpia para una marca alternativa sin exceso visual.</h2>
        </motion.div>
        <div className="culture-tags" aria-label="Esteticas relacionadas">
          {cultureTags.map((tag) => (
            <motion.button
              type="button"
              key={tag}
              onClick={() => scrollToId("shop")}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            >
              {tag}
              <ArrowUpRight size={16} />
            </motion.button>
          ))}
        </div>
      </section>

      <section className="editorial-section section-pad">
        <motion.div className="section-label" {...motionProps}>
          <span>Editorial</span>
          <span>mobile first energy</span>
        </motion.div>
        <div className="editorial-layout">
          <motion.div className="phone-stack" {...motionProps}>
            <img src={phoneTwo} alt="Mockup editorial oscuro de coleccion Kyro" />
            <img src={phoneOne} alt="Mockup editorial claro de tienda de moda" />
          </motion.div>
          <motion.div className="editorial-copy" {...motionProps}>
            <Gem size={24} />
            <h2>Antes de vender una prenda, Kyro vende una atmosfera.</h2>
            <p>
              La tienda aparece despues del impacto visual: primero se entiende el mundo, despues se explora el drop.
            </p>
            <button className="magnetic-button primary" type="button" onClick={() => scrollToId("shop")}>
              Entrar al marketplace
              <ArrowUpRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
