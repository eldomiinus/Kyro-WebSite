# Kyro

Página web oficial de **Kyro**, una marca independiente de ropa y accesorios alternativos: streetwear, cyberpunk, Y2K, techwear, visual kei, harajuku y cultura japonesa, con varias piezas hechas a mano.

Este repositorio se publica de manera abierta bajo licencia MIT. El nombre "Kyro" y sus diseños están disponibles para uso libre.

> _"Cualquiera puede crear y cualquiera puede expresar."_

## Stack técnico

- **Vite 6** + **React 18** + **TypeScript** (strict)
- **Tailwind CSS 3** con tokens de marca en `tailwind.config.ts`
- **Framer Motion 11** para animaciones declarativas
- **Lenis** para smooth scroll
- **Lucide React** para iconografía
- Sin backend: productos, favoritos y carrito persisten en `localStorage`

## Estructura del proyecto

```
kyro-website/
├── WebSite/                 # Raíz de la app Vite (vite.config.ts → root: "WebSite")
│   ├── index.html           # Shell HTML con SEO, fuentes y favicon
│   ├── style.css            # Estilos globales (componentes, animaciones, tokens)
│   ├── public/
│   │   └── images/          # Assets servidos con ruta absoluta (favicon, og:image)
│   └── src/
│       ├── main.tsx         # Entry point de React
│       ├── App.tsx          # Composición: Header + Hero + BrandStory + Marketplace + footer
│       ├── types.ts         # Tipos compartidos (Product, CartItem)
│       ├── vite-env.d.ts    # Tipos de Vite + Web Component spline-viewer
│       ├── components/      # Secciones y UI reutilizable
│       ├── data/            # Catálogo de productos demo
│       ├── hooks/           # Hooks personalizados (useLocalStorage)
│       ├── utils/           # Utilidades (format, navigation)
│       └── assets/
│           ├── README.md    # Catálogo de imágenes
│           └── images/      # PNGs importados por componentes
├── .github/FUNDING.yml      # Configuración de GitHub Sponsors / Ko-fi
├── package.json             # Dependencias y scripts
├── pnpm-lock.yaml           # Lockfile determinístico
├── pnpm-workspace.yaml      # Aprobación de build scripts (esbuild)
├── postcss.config.cjs       # Pipeline de PostCSS
├── tailwind.config.ts       # Tokens de marca y fuentes
├── tsconfig.json            # TS base (referencias)
├── tsconfig.app.json        # TS para src/
├── tsconfig.node.json       # TS para vite.config y tailwind.config
├── vite.config.ts           # Configuración de Vite (root: WebSite, outDir: dist)
├── .gitignore               # Exclusiones estándar
├── LICENSE                  # MIT
└── README.md                # Este archivo
```

## Cómo correrlo

### Requisitos

- **Node.js 18+**
- **pnpm** ([instrucciones de instalación](https://pnpm.io/installation))

### Instalación

```bash
pnpm install
pnpm approve-builds    # aprueba el build script de esbuild (una sola vez)
```

### Desarrollo

```bash
pnpm dev
# → http://127.0.0.1:5173/
```

### Build de producción

```bash
pnpm build
# → ../dist/
```

### Preview del build

```bash
pnpm preview
# → http://127.0.0.1:4173/
```

## Decisiones de diseño

- **Sin checkout real.** El botón "Finalizar pedido" abre el cliente de email con el detalle. Es una demo, no un e-commerce.
- **Sin autenticación.** Carrito y favoritos viven en `localStorage` del navegador.
- **Spline 3D en el hero.** Se carga como mejora progresiva desde `https://prod.spline.design/BCQTO-gZrrdxeHzo/`. Si la escena no carga, el hero sigue funcionando.
- **Accesibilidad.** `prefers-reduced-motion` desactiva animaciones. Modales y drawer tienen roles ARIA, `Escape` para cerrar y foco inicial.
- **Responsive.** Mobile-first con breakpoints `sm`, `md`, `lg`, `xl`.

## Licencia

MIT — ver [LICENSE](./LICENSE).
