export default {
    content: ["./WebSite/index.html", "./WebSite/src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                kyro: {
                    black: "#030305",
                    panel: "#0b0c10",
                    line: "rgba(255,255,255,0.12)",
                    white: "#f7f7fb",
                    muted: "#a7a8b4",
                    cyan: "#20f5ff",
                    pink: "#ff3fd1",
                    violet: "#8c5cff",
                    red: "#ff1515"
                }
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
                display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
                jp: ["Noto Sans JP", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
            },
            boxShadow: {
                neon: "0 0 34px rgba(32,245,255,0.2), 0 0 60px rgba(255,63,209,0.12)"
            }
        }
    },
    plugins: []
};
