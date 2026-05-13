# Animación de cortinilla en el cambio de tema (dark/light mode)

Implementación de una transición visual tipo "cortinilla hacia abajo" al cambiar entre modo oscuro y claro, usando la **View Transitions API** del navegador.

---

## Cómo funciona

Cuando el usuario pulsa el toggle de tema, en lugar de cambiar los colores de golpe, el navegador captura el estado actual de la página (snapshot) y aplica el nuevo tema. La View Transitions API nos permite animar el paso de un snapshot al otro: animamos el nuevo estado para que "caiga" desde arriba con un `clip-path`, creando el efecto de cortinilla.

---

## Implementación

### 1. JavaScript — el toggle de tema

El cambio de tema se extrae a una función `applyTheme()` para pasársela a `startViewTransition`. Si el navegador no soporta la API (o el usuario tiene `prefers-reduced-motion` activo), se aplica el cambio directamente sin animación.

```js
toggle.addEventListener('click', function () {
  var current = root.getAttribute('data-theme') || 'light';
  var next = current === 'dark' ? 'light' : 'dark';

  function applyTheme() {
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncIcon();
  }

  // Fallback: sin animación si no hay soporte o el usuario prefiere sin movimiento
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !document.startViewTransition) {
    applyTheme();
    return;
  }

  // Lanzar la transición
  var transition = document.startViewTransition(applyTheme);

  // Una vez el navegador tiene ambos snapshots listos, animar el nuevo estado
  transition.ready.then(function () {
    document.documentElement.animate(
      { clipPath: ['inset(0 0 100% 0)', 'inset(0)'] },
      {
        pseudoElement: '::view-transition-new(root)',
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    );
  });
});
```

**Por qué `transition.ready`:** La promesa `.ready` se resuelve cuando el navegador ha creado los pseudo-elementos `::view-transition-*` y está listo para recibir animaciones personalizadas. Si animamos antes de este punto, los pseudo-elementos aún no existen.

**El `clip-path`:**
- `inset(0 0 100% 0)` → el nuevo estado está completamente oculto (inset del 100% desde abajo)
- `inset(0)` → completamente visible

El resultado es que la nueva capa "cae" desde la parte superior, como una persiana.

---

### 2. CSS — desactivar las animaciones por defecto

Por defecto, la View Transitions API aplica un fade cruzado entre el snapshot antiguo y el nuevo. Hay que desactivarlo para que solo corra nuestra animación de cortinilla.

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
```

- `animation: none` cancela el fade por defecto del navegador.
- `mix-blend-mode: normal` evita que los dos snapshots se mezclen visualmente durante la transición.

---

## Compatibilidad

| Navegador | Soporte |
|-----------|---------|
| Chrome / Edge | ✅ desde v111 |
| Safari | ✅ desde v18 |
| Firefox | ✅ desde v131 |
| Resto | ⚡ fallback instantáneo |

El código incluye un fallback automático: si el navegador no soporta `document.startViewTransition`, el tema cambia sin animación exactamente igual que antes.

---

## Variantes del clip-path

Cambiando el valor inicial del `clip-path` se obtienen efectos distintos:

| Efecto | Valor inicial |
|--------|--------------|
| Cortinilla desde arriba (↓) | `inset(0 0 100% 0)` |
| Cortinilla desde abajo (↑) | `inset(100% 0 0 0)` |
| Cortinilla desde la izquierda (→) | `inset(0 100% 0 0)` |
| Cortinilla desde la derecha (←) | `inset(0 0 0 100%)` |

---

## Referencias

- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [MDN: Element.animate()](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)
- [MDN: CSS clip-path inset()](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
