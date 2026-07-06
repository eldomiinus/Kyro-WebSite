import type { Config } from "tailwindcss";

export default {
  content: ["./WebSite/index.html", "./WebSite/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kyro: {
          // Monocromaticos base (no dependen del tema)
          blood: "#780606",
          wine: "#451111",
          coral: "#DE6464",
          rose: "#FFA6A6",
          blush: "#FFD9D9",
          // Tokens semanticos resueltos segun [data-theme] en style.css
          ink: "var(--kyro-ink)",
          panel: "var(--kyro-panel)",
          panel2: "var(--kyro-panel-2)",
          surface: "var(--kyro-surface)",
          line: "var(--kyro-line)",
          lineStrong: "var(--kyro-line-strong)",
          white: "var(--kyro-white)",
          muted: "var(--kyro-muted)",
          dim: "var(--kyro-dim)",
          accent: "var(--kyro-accent)",
          accentSoft: "var(--kyro-accent-soft)",
          accentDeep: "var(--kyro-accent-deep)"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        jp: ["Noto Sans JP", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 34px rgba(120, 6, 6, 0.28), 0 0 60px rgba(222, 100, 100, 0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;
