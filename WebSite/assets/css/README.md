# assets/css/

Hojas de estilo globales:

- `main.css` — tokens (variables), reset, layout y componentes
  utilitarios como botones.

Las hojas de estilo de cada componente viven en `../../components/`.
Mantenemos la separación para que cada módulo JS controle su CSS.

## Cómo añadir un nuevo tema

Sobrescribí las variables CSS en una hoja propia o directamente en
`<style>` y cargala **después** de `main.css`. Ejemplo:

```html
<link rel="stylesheet" href="assets/css/main.css" />
<link rel="stylesheet" href="assets/css/theme-dark.css" />
```

```css
/* theme-dark.css */
:root {
  --color-bg: #111;
  --color-surface: #1c1c1c;
  --color-text: #f5f5f5;
  --color-muted: #9a9a9a;
  --color-border: #2a2a2a;
}
```
