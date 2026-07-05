# Assets de Kyro

Catálogo visual de las imágenes del proyecto. Cualquier imagen nueva se sube acá.

## `images/`

| Archivo | Tamaño | Uso en la web | Descripción |
|---|---|---|---|
| `Cat - Rojo v2.png` | 61 kB | favicon, og:image, hero, marketplace, products | Isotipo (gato rojo). Identidad principal. |
| `Kyro Store.png` | 43 kB | header, hero | Wordmark de la marca (negro con alpha). |
| `iPhone 12 Pro 1.png` | 350 kB | BrandStory, Marketplace | Mockup editorial de producto sobre iPhone. |
| `iPhone 12 Pro 2.png` | 346 kB | BrandStory, Marketplace | Mockup editorial de producto sobre iPhone. |
| `Instagram.png` | 759 B | (reservado, no usado actualmente) | Ícono de Instagram. |
| `Mail.png` | 565 B | (reservado, no usado actualmente) | Ícono de email. |

## Cómo se importan

```ts
// Desde un componente en src/components/ o src/data/
import miImagen from "../assets/images/archivo.png";
```

Vite se encarga de:
- Copiar la imagen a `dist/assets/` con un nombre hasheado.
- Reemplazar el import por la URL final en el bundle.
- Generar un warning si la imagen no se usa.

## Formato recomendado

- **PNG con transparencia** para logos, isotipos, mockups.
- **WebP** para fotos grandes si bajamos peso en el futuro.
- Evitar JPG para assets con texto o líneas finas.

## Convención de nombres

- Usar **kebab-case** o nombres con espacios legibles (estilo actual).
- Prefijo descriptivo cuando aplique: `mockup-iphone-1.png` en vez de `iPhone 12 Pro 1.png`.
- Evitar mayúsculas intermedias innecesarias.
