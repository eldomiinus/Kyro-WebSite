<div align="center">

# Kyro

**Ropa sin abuso. Diseños sin candado.**

[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](./LICENSE)
[![HTML estático](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS-111111)](./WebSite)
[![Sin build](https://img.shields.io/badge/Build-No%20requerido-success)](#-inicio-rápido)
[![Open Source](https://img.shields.io/badge/Diseños-Uso%20libre-orange)](#-recursos-open-source)

_Página web oficial y plantilla abierta de **Kyro** — un proyecto comunitario independiente de estética alternativa._

> _"Cualquiera puede crear y cualquiera puede expresar."_

[Ver el sitio en local](#-inicio-rápido) · [Explorar el código](./WebSite) · [Licencia MIT](./LICENSE)

</div>

---

## ✦ ¿Qué es Kyro?

**Kyro no es una marca comercial tradicional.** Es un proyecto comunitario de ropa y accesorios alternativos — muchas piezas hechas a mano — que nació con una idea simple:

> La ropa no debería ser un medio de monetización abusivo.

En lugar de cerrar diseños, inflar márgenes opacos o tratar la moda como un producto exclusivo, Kyro apuesta por **transparencia**, **participación** y **código abierto**. Publicamos el sitio, los diseños y la filosofía bajo licencia **MIT** para que cualquiera pueda conocer, usar y adaptar el proyecto.

| Lo que Kyro **sí** es | Lo que Kyro **no** es |
| --- | --- |
| Proyecto comunitario e independiente | Marca corporativa de consumo masivo |
| Estética alternativa y expresión libre | Catálogo cerrado con diseños propietarios |
| Precios con costos visibles | Márgenes ocultos y marketing engañoso |
| Plantilla reutilizable para otros proyectos | Sitio monolítico difícil de modificar |

---

## ◈ Nuestra filosofía

El sitio web refleja tres pilares que guían todo el trabajo:

<table>
<tr>
<td align="center" width="33%">
<h3>🔍 Transparencia</h3>
<p>Cada producto muestra su <strong>desglose de costos</strong>: prenda, tinta, trabajo y gastos fijos. Sin letra chica.</p>
</td>
<td align="center" width="33%">
<h3>🤝 Comunidad</h3>
<p>Las personas usuarias comparten fotos, versiones y aportes en una <strong>galería comunitaria</strong> — no reseñas anónimas de un marketplace.</p>
</td>
<td align="center" width="33%">
<h3>📂 Open Source</h3>
<p>Diseños y recursos gráficos de <strong>uso libre</strong>. Descargá, imprimí, modificá y producí tu propia versión respetando la licencia MIT.</p>
</td>
</tr>
</table>

---

## 🌐 El sitio web

Este repositorio contiene la **página funcional de Kyro** y, al mismo tiempo, una **plantilla lista para adaptar** a otros proyectos con valores similares.

### Secciones principales

| Sección | Ruta | Descripción |
| --- | --- | --- |
| 🏠 **Inicio** | [`WebSite/index.html`](./WebSite/index.html) | Presentación de la marca, pilares y productos destacados |
| 🛍️ **Catálogo** | [`WebSite/pages/catalog.html`](./WebSite/pages/catalog.html) | Grilla de productos con filtros por tipo, categoría y orden |
| 👕 **Producto** | [`WebSite/pages/product.html`](./WebSite/pages/product.html) | Ficha con transparencia de costos y galería comunitaria |
| 👥 **Comunidad** | [`WebSite/pages/community.html`](./WebSite/pages/community.html) | Feed de aportes, fotos y modificaciones de la comunidad |
| 📥 **Recursos** | [`WebSite/pages/resources.html`](./WebSite/pages/resources.html) | Descargas directas de archivos gráficos bajo MIT |
| 🔐 **Cuenta** | [`WebSite/pages/account.html`](./WebSite/pages/account.html) | Login y registro (preparado para integrar backend) |

### Características técnicas

- **100 % estático** — HTML, CSS y JavaScript nativo. Sin npm, sin bundlers, sin dependencias.
- **Sin build** — serví la carpeta `WebSite/` y listo.
- **Componentes modulares** — navbar, footer, carrito, filtros y más, cada uno con su `.js` + `.css`.
- **Capa de datos desacoplada** — `window.KYRO.*` con datos mock hoy; mañana conectás tu API sin reescribir la UI.
- **Tokens de diseño centralizados** — variables CSS en `main.css` para tematizar sin tocar componentes.
- **Accesible y usable** — carrito lateral con `localStorage`, navegación por teclado y estructura semántica.

> Documentación técnica detallada → [`WebSite/README.md`](./WebSite/README.md)

---

## 📁 Estructura del repositorio

```
Kyro-WebSite/
├── WebSite/
│   ├── index.html              # Página de inicio
│   ├── pages/                  # Catálogo, producto, comunidad, recursos, cuenta
│   ├── components/             # UI reutilizable (navbar, cart, filters, …)
│   └── assets/
│       ├── css/main.css        # Variables, reset y layout base
│       ├── js/                 # Datos mock y lógica de páginas
│       └── img/                # Imágenes y placeholders
├── LICENSE                     # MIT — uso, modificación y distribución libres
└── README.md                   # Este archivo
```

---

## 🚀 Inicio rápido

No necesitás instalar nada. Cloná el repositorio y abrí el sitio:

```bash
git clone https://github.com/eldomiinus/Kyro-WebSite.git
cd Kyro-WebSite
```

**Opción A — Servidor local** _(recomendado)_

```bash
python3 -m http.server 8080 --directory WebSite
```

Luego visitá → **http://localhost:8080**

**Opción B — Abrir directamente**

```bash
xdg-open WebSite/index.html    # Linux
open WebSite/index.html        # macOS
start WebSite/index.html       # Windows
```

---

## 🧩 Usar Kyro como plantilla

¿Querés montar tu propio proyecto con la misma base? Podés hacerlo sin pedir permiso:

1. **Fork** o cloná este repositorio.
2. **Personalizá los estilos** editando las variables en `WebSite/assets/css/main.css`.
3. **Reemplazá los datos** en `WebSite/assets/js/data.js` o conectá tu API manteniendo la estructura `window.KYRO`.
4. **Sumá tus diseños** en `WebSite/assets/img/` y publicá los recursos en la sección de descargas.
5. **Integrá backend** donde encontrarás marcadores `// Punto de integración con backend` en `cart.js` y `account.js`.

El nombre **"Kyro"**, los diseños publicados y el código fuente están disponibles bajo [licencia MIT](./LICENSE): usá, modificá, distribuí e incluso vendé productos con ellos, siempre que mantengas el aviso de copyright original.

---

## 📂 Recursos open source

En [`pages/resources.html`](./WebSite/pages/resources.html) encontrarás archivos gráficos descargables — fuentes, estampas, logos — listos para producción casera o talleres independientes.

```
✔ Descargar libremente
✔ Modificar a tu gusto
✔ Distribuir y producir
✔ Mantener el aviso MIT
```

Más información sobre la licencia → [opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

---

## 🤲 Apoyar el proyecto

Kyro es independiente y comunitario. Si querés colaborar con el sostenimiento del proyecto:

- ☕ [Ko-fi — eldomiinus](https://ko-fi.com/eldomiinus)
- 💜 [Ceneka — eldomiinus](https://ceneka.net/eldomiinus)

También podés contribuir con código, diseños, traducciones o compartiendo tus propias versiones en la galería comunitaria.

---

## 📄 Licencia

Este repositorio — incluyendo el sitio web, su código y los diseños publicados — se distribuye bajo la **licencia MIT**.

Ver el texto completo en [`LICENSE`](./LICENSE).

---

<div align="center">

**Kyro** — _Crea, usa, comparte._

Hecho con intención de apoyar e inspirar la comunidad.

</div>
