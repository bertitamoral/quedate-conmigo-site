# Design System

## Direction

Una noche de lanzamiento en Barcelona: asfalto mojado, cielo rosado de tormenta, negro tinta y el rojo de la linea que atraviesa la cubierta. El sitio debe sentirse como la adaptacion digital del libro, no como una revista generica.

## Color

- Fondo papel: `oklch(0.975 0.008 70)`
- Tinta: `oklch(0.19 0.012 32)`
- Rojo cubierta: `oklch(0.47 0.19 27)`
- Rojo profundo: `oklch(0.30 0.12 25)`
- Rosa cielo: `oklch(0.88 0.035 28)`
- Gris ciudad: `oklch(0.53 0.018 45)`
- Blanco calido: `oklch(0.99 0.004 75)`

La estrategia es comprometida: el rojo de la cubierta ocupa CTA, separadores narrativos y momentos comerciales. Los neutros siguen el clima calido/gris de la imagen.

## Typography

- Display: `Bodoni Moda`, alto contraste y presencia de cubierta literaria.
- Texto y UI: `Source Sans 3`, lectura limpia y controles claros.
- No usar manuscrita como fuente estructural; la caligrafia ya vive en la portada.
- Titulares fluidos con `clamp()` y cuerpo limitado a 70 caracteres.

## Layout

- Hero de primera pantalla dominado por la cubierta real.
- Composiciones asimetricas, imagenes grandes y bloques de texto estrechos.
- Ritmo alternado entre papel, rojo y escenas fotograficas.
- Evitar grids de tarjetas identicas; usar listas editoriales, franjas y composiciones escalonadas.
- Radio maximo habitual de 8px; reservar formas redondas para iconos o indicadores.

## Components

- Boton primario rojo, rectangular y firme.
- Boton secundario transparente con borde de tinta.
- Campos con etiqueta visible, fondo blanco calido y foco rojo.
- Mensajes de estado en linea, con icono y `aria-live`.
- Navegacion compacta con CTA de compra constante.

## Motion

- Entrada inicial escalonada y revelados por scroll con opacidad/transform.
- Movimiento leve de cubierta y lineas narrativas.
- Sin rebotes ni parallax agresivo.
- Desactivar animaciones no esenciales con `prefers-reduced-motion`.
