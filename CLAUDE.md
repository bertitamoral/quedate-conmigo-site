# CLAUDE.md

## Proyecto

Web oficial de Berta Moral Martín y landing page de lanzamiento de su primera novela, **"Quédate conmigo"**.

El sitio debe presentar a Berta como autora, promocionar la novela, captar emails de lectores potenciales, preparar futuras ventas o reservas y construir una marca literaria personal alrededor de una historia íntima de ruptura, reconstrucción, amor propio y nueva etapa.

La web está en español y debe sentirse literaria, emocional, elegante, femenina, cercana y profesional. No debe parecer una web corporativa ni una landing agresiva de ventas.

Idea central:

> "Quédate conmigo" no es solo una novela sobre una ruptura. Es una historia sobre volver a elegirse.

## Stack y arquitectura

- App React 19 con Vite y TanStack Start.
- Routing con TanStack Router / TanStack Start.
- Despliegue con Nitro, preparado para deteccion automatica de Vercel.
- Estilos con Tailwind CSS v4 en `src/styles.css`.
- Componentes UI tipo shadcn/Radix en `src/components/ui`.
- Ruta principal en `src/routes/index.tsx`.
- Checkout en `src/routes/comprar.tsx`.
- Funciones de email/compra en `src/server/email.ts`.
- Root HTML, metadatos globales, errores y providers en `src/routes/__root.tsx`.
- Configuracion estandar Vite/TanStack/Nitro en `vite.config.ts`.
- Assets visuales importados desde `src/assets`.

Comandos utiles:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Direccion creativa

El resultado debe transmitir:

- Honestidad, sensibilidad y vulnerabilidad.
- Fortaleza tranquila y reconstruccion personal.
- Barcelona como escenario emocional.
- Intimidad literaria y aire de novela contemporanea.
- Inicio de una nueva etapa para una autora novel.

Referencias visuales principales:

- Portada: mujer caminando con maleta en Barcelona, Sagrada Familia al fondo, ambiente emocional, dramatico y cinematografico.
- Foto de Berta: retrato cercano, natural, sonriente, con flores de fondo.

Evitar:

- Colores chillones o corporativos.
- Copy excesivamente comercial.
- Secciones que parezcan SaaS, dashboard o plantilla generica.
- Decoracion gratuita que no aporte al tono literario.

## Identidad visual

Paleta recomendada:

- Blanco roto.
- Beige calido.
- Gris suave.
- Negro carbon.
- Rojo vino / burdeos para llamadas a la accion.
- Rosa empolvado como secundario.
- Dorado muy sutil para detalles.

Tipografia:

- Serif elegante para titulos, actualmente `Cormorant Garamond`.
- Sans limpia para texto, actualmente `Inter`.
- Manuscrita solo para detalles puntuales, actualmente `Dancing Script`.

Mantener mucho espacio en blanco, composicion editorial, ritmo calmado y llamadas a la accion claras pero elegantes.

## Estructura de la landing

La web es una one-page con navegacion superior, preparada para crecer. Secciones esperadas:

1. Hero principal.
2. Sobre el libro.
3. Premisa / frase central.
4. La historia detras de "Quédate conmigo".
5. Temas de la novela.
6. Para quien es este libro.
7. Fragmento o extracto preparado para futuro contenido real.
8. Sobre Berta Moral Martín.
9. Lanzamiento / newsletter.
10. Comunidad.
11. Redes sociales.
12. Contacto y prensa.
13. Footer.

Navegacion:

- Inicio
- El libro
- La autora
- Newsletter
- Contacto
- CTA destacado: "Quiero leerlo"

## Mensajes y copy clave

Hero:

- Titulo: **Quédate conmigo**
- Subtitulo: **Una novela sobre el amor, la pérdida y la valentía de reconstruirse.**
- Frase breve: **Hay historias que no comienzan cuando dos personas se encuentran, sino cuando una decide quedarse.**
- Texto secundario: primera novela de Berta Moral Martín, relato autobiografico inspirado en ruptura, cambio y busqueda interior.

Sobre el libro:

**"Quédate conmigo" es una novela autobiográfica que nace en un momento de ruptura y cambio. Una historia sobre el amor, pero también sobre la identidad, la pérdida y la reconstrucción personal.**

**A través de sus páginas, Berta recorre un proceso íntimo de separación, cuestionamiento y crecimiento. La novela convierte lo vivido en palabra, y la palabra en una forma de comprender, atravesar y empezar de nuevo.**

Premisa:

> Hay historias que no comienzan cuando dos personas se encuentran, sino cuando una decide quedarse.

CTA permitidos:

- Quiero leerlo
- Avísame del lanzamiento
- Unirme a la comunidad
- Conoce la historia
- Sigue a Berta
- Recibir novedades
- Quiero estar dentro

## Funcionalidades esperadas

- Responsive para movil, tablet y desktop.
- Header fijo o semifijo, transparente al inicio y con fondo suave al hacer scroll.
- Newsletter con campos `Nombre` y `Email`, preparado para Mailchimp, Brevo, ConvertKit o similar.
- Formulario de contacto con `Nombre`, `Email`, `Motivo del contacto` y `Mensaje`.
- Animaciones suaves al hacer scroll.
- SEO basico y metadatos sociales.
- Estructura preparada para futuros enlaces de compra en Amazon, Casa del Libro, editorial o librerias.

## SEO

Title:

```text
Quédate conmigo | Berta Moral Martín
```

Meta description:

```text
Descubre Quédate conmigo, la primera novela de Berta Moral Martín. Una historia autobiográfica sobre amor, ruptura, identidad y reconstrucción personal.
```

Keywords:

```text
Berta Moral Martín, Quédate conmigo, novela autobiográfica, novela sobre ruptura, novela sobre amor, novela de superación, escritora novel, literatura contemporánea, reconstrucción personal, salud mental, novela emocional.
```

Revisar `src/routes/__root.tsx`: todavia puede contener metadatos heredados de Lovable que conviene sustituir por los definitivos del proyecto.

## Estado actual del codigo

- `src/routes/index.tsx` contiene la landing principal y usa la cubierta final y fotografias de Berta.
- `src/routes/comprar.tsx` implementa el flujo de datos de envio y eleccion Bizum/Wallapop.
- `src/server/email.ts` contiene server functions de Resend para pedidos, contacto y newsletter.
- `src/styles.css` define el sistema visual de produccion en OKLCH.
- `src/routes/__root.tsx` mantiene el shell, provider de React Query, paginas de error y metadatos globales.
- `vite.config.ts` usa plugins estandar y Nitro. No reintroducir Lovable ni Cloudflare.
- Los valores comerciales y credenciales se documentan en `.env.example`.

## Criterios de calidad

Antes de cerrar cambios importantes:

- Ejecutar `npm run build`.
- Ejecutar `npm run lint` si los cambios tocan TypeScript/React.
- Comprobar visualmente desktop y movil.
- Verificar que no haya textos cortados, solapamientos ni CTAs perdidos.
- Mantener el tono emocional y literario en todo el copy.
- Mantener los formularios listos para integracion aunque aun no envien a un proveedor real.

## Futuras mejoras probables

- Sustituir placeholders de redes por URLs reales.
- Conectar newsletter a proveedor real.
- Conectar formulario de contacto.
- Añadir fecha de lanzamiento y contador real.
- Añadir fragmento oficial de la novela.
- Añadir enlaces de compra o preventa.
- Actualizar imagen OG final para compartir en redes.
- Revisar politica de privacidad cuando haya captacion real de emails.
