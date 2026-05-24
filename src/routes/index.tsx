import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import coverImg from "@/assets/quedate-conmigo-cover.jpg";
import bertaPortrait from "@/assets/berta-portrait.jpg";
import bertaWriting from "@/assets/berta-writing.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quédate conmigo | Berta Moral Martín" },
      {
        name: "description",
        content:
          "Primera novela de Berta Moral Martín. Una historia autobiográfica sobre amor, ruptura, identidad, pérdida y reconstrucción personal. Lanzamiento próximamente.",
      },
      {
        name: "keywords",
        content:
          "Berta Moral Martín, Quédate conmigo, novela autobiográfica, novela sobre ruptura, novela sobre amor, novela de superación, escritora novel, literatura contemporánea, reconstrucción personal",
      },
      { property: "og:title", content: "Quédate conmigo | Berta Moral Martín" },
      {
        property: "og:description",
        content:
          "Una novela sobre el amor, la pérdida y la valentía de reconstruirse. Lanzamiento próximamente.",
      },
      { property: "og:type", content: "book" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#libro", label: "El libro" },
    { href: "#autora", label: "La autora" },
    { href: "#newsletter", label: "Newsletter" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#inicio" className="font-serif text-lg tracking-wide">
          Berta Moral Martín
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/80 transition hover:text-burgundy"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#newsletter"
            className="rounded-full bg-burgundy px-5 py-2 text-sm text-primary-foreground transition hover:opacity-90"
          >
            Quiero leerlo
          </a>
        </nav>
        <button
          aria-label="Menú"
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="space-y-1.5">
            <span className="block h-px w-6 bg-foreground" />
            <span className="block h-px w-6 bg-foreground" />
            <span className="block h-px w-6 bg-foreground" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-foreground/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#newsletter"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-burgundy px-5 py-2 text-center text-sm text-primary-foreground"
            >
              Quiero leerlo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/40 via-background to-background" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
        <div className="reveal">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-burgundy/80">
            Una novela de Berta Moral Martín
          </p>
          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
            Quédate <span className="italic text-burgundy">conmigo</span>
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl italic text-foreground/80 md:text-2xl">
            Una novela sobre el amor, la pérdida y la valentía de reconstruirse.
          </p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Hay historias que no comienzan cuando dos personas se encuentran,
            sino cuando una decide quedarse.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            La primera novela de <strong className="text-foreground">Berta Moral Martín</strong>.
            Un relato autobiográfico inspirado en una etapa de ruptura, cambio y
            búsqueda interior.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#newsletter"
              className="rounded-full bg-burgundy px-7 py-3.5 text-sm tracking-wide text-primary-foreground shadow-lg shadow-burgundy/10 transition hover:translate-y-[-1px] hover:opacity-95"
            >
              Quiero saber cuándo sale
            </a>
            <a
              href="#libro"
              className="rounded-full border border-foreground/20 px-7 py-3.5 text-sm tracking-wide text-foreground transition hover:border-burgundy hover:text-burgundy"
            >
              Conoce la historia
            </a>
          </div>
        </div>

        <div className="relative reveal">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent/40 via-secondary/30 to-transparent blur-2xl" />
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -top-4 -left-4 h-24 w-24 border-t border-l border-gold/60" />
            <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b border-r border-gold/60" />
            <img
              src={coverImg}
              alt='Portada de la novela "Quédate conmigo" de Berta Moral Martín'
              className="w-full rounded-sm object-cover shadow-2xl shadow-foreground/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutBook() {
  return (
    <section id="libro" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-3">
        <div className="md:col-span-2 reveal">
          <p className="text-xs uppercase tracking-[0.35em] text-burgundy/80">
            Sobre el libro
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Una historia íntima sobre volver a empezar.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              <em>“Quédate conmigo”</em> es una novela autobiográfica que nace
              en un momento de ruptura y cambio. Una historia sobre el amor,
              pero también sobre la identidad, la pérdida y la reconstrucción
              personal.
            </p>
            <p>
              A través de sus páginas, Berta recorre un proceso íntimo de
              separación, cuestionamiento y crecimiento. La novela convierte lo
              vivido en palabra, y la palabra en una forma de comprender,
              atravesar y empezar de nuevo.
            </p>
          </div>
        </div>
        <aside className="reveal rounded-xl border border-border bg-card p-8 shadow-sm">
          <Detail label="Género">
            Narrativa autobiográfica con elementos de ficción.
          </Detail>
          <Divider />
          <Detail label="Temas principales">
            Ruptura, amor, identidad, salud mental, amistad, familia, pérdida y
            reconstrucción.
          </Detail>
          <Divider />
          <Detail label="Tono">
            Vulnerable, emocional, íntimo, terapéutico y honesto.
          </Detail>
        </aside>
      </div>
    </section>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.3em] text-burgundy/80">
        {label}
      </p>
      <p className="mt-2 font-serif text-lg leading-snug text-foreground/85">
        {children}
      </p>
    </div>
  );
}

function Divider() {
  return <div className="my-5 h-px w-10 bg-gold/60" />;
}

function Premise() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-burgundy" />
      <div className="mx-auto max-w-4xl px-6 text-center text-primary-foreground reveal">
        <span className="font-script text-3xl text-gold">la premisa</span>
        <blockquote className="mt-6 font-serif text-3xl italic leading-tight md:text-5xl">
          “Hay historias que no comienzan cuando dos personas se encuentran,
          sino cuando una decide quedarse.”
        </blockquote>
        <p className="mt-8 text-base text-primary-foreground/80 md:text-lg">
          Una frase que resume el corazón de la novela: la decisión de
          permanecer en una misma cuando todo alrededor cambia.
        </p>
      </div>
    </section>
  );
}

function BehindTheStory() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 md:grid-cols-2 md:items-center">
        <div className="relative reveal order-2 md:order-1">
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-accent/30 blur-xl" />
          <img
            src={bertaWriting}
            alt="Berta Moral Martín escribiendo frente a una ventana con vistas a Barcelona"
            className="w-full rounded-sm object-cover shadow-xl shadow-foreground/10"
          />
        </div>
        <div className="reveal order-1 md:order-2">
          <p className="text-xs uppercase tracking-[0.35em] text-burgundy/80">
            La historia detrás
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            La historia detrás de <em>“Quédate conmigo”</em>.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>Esta novela nace de una necesidad: ordenar lo vivido.</p>
            <p>
              Berta escribe desde un lugar profundamente personal, donde la
              separación, las dudas, los vínculos, las pérdidas y los afectos
              se convierten en materia narrativa. La protagonista atraviesa un
              proceso de cambio vital en el que no solo debe comprender lo que
              ha perdido, sino también descubrir quién quiere ser a partir de
              ahora.
            </p>
            <p>
              Familia, amistades, entorno laboral, amor, traiciones y salud
              mental forman parte de un viaje emocional que muchas personas
              reconocerán como propio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const themes = [
  {
    title: "Ruptura",
    text: "Cuando una relación termina, también se rompe una versión de quien eras.",
  },
  {
    title: "Identidad",
    text: "La pregunta no es solo qué ha pasado, sino quién soy después de esto.",
  },
  {
    title: "Amor",
    text: "El amor como refugio, como herida y como aprendizaje.",
  },
  {
    title: "Salud mental",
    text: "El proceso invisible de sostenerse cuando todo parece moverse por dentro.",
  },
  {
    title: "Amistad y familia",
    text: "Los vínculos que acompañan, sostienen y también transforman.",
  },
  {
    title: "Reconstrucción",
    text: "Volver a empezar no siempre es épico. A veces es simplemente levantarse un día más.",
  },
];

function Themes() {
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl reveal">
          <p className="text-xs uppercase tracking-[0.35em] text-burgundy/80">
            Temas
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Temas que atraviesan la novela
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {themes.map((t, i) => (
            <div
              key={t.title}
              className="reveal bg-background p-8 transition hover:bg-card"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-serif text-sm italic text-burgundy">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-serif text-2xl">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const forYou = [
  "Has atravesado una ruptura que te obligó a mirarte de nuevo.",
  "Has sentido que necesitabas reconstruir tu vida desde cero.",
  "Te interesan las historias íntimas, reales y vulnerables.",
  "Te gustan las novelas que hablan del amor sin idealizarlo.",
  "Estás en un momento de cambio personal.",
  "Buscas una lectura emocional, honesta y cercana.",
  "Quieres acompañar a una autora novel en el inicio de su camino literario.",
];

function ForYou() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 reveal">
        <p className="text-xs uppercase tracking-[0.35em] text-burgundy/80">
          Para ti
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
          Este libro es para ti si…
        </h2>
        <ul className="mt-10 space-y-5">
          {forYou.map((line) => (
            <li key={line} className="flex items-start gap-4">
              <span className="mt-3 block h-px w-8 shrink-0 bg-burgundy" />
              <span className="font-serif text-lg text-foreground/85 md:text-xl">
                {line}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-12 max-w-2xl text-base italic leading-relaxed text-muted-foreground">
          “Quédate conmigo” habla especialmente a mujeres alrededor de los 30
          años, pero también a cualquier persona que haya amado, perdido,
          dudado y vuelto a empezar.
        </p>
      </div>
    </section>
  );
}

function Excerpt() {
  return (
    <section className="bg-accent/25 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center reveal">
        <p className="text-xs uppercase tracking-[0.35em] text-burgundy/80">
          Fragmento
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
          Un fragmento de la novela
        </h2>
        <div className="mx-auto mt-12 max-w-2xl border-y border-burgundy/20 py-12">
          <p className="font-serif text-2xl italic leading-snug text-foreground/85">
            Próximamente podrás leer aquí un pequeño fragmento de{" "}
            <em>“Quédate conmigo”</em>.
          </p>
        </div>
        <p className="mt-8 text-muted-foreground">
          Una primera mirada al universo emocional de la novela.
        </p>
        <a
          href="#newsletter"
          className="mt-8 inline-block rounded-full bg-burgundy px-7 py-3.5 text-sm tracking-wide text-primary-foreground transition hover:opacity-90"
        >
          Avísame cuando esté disponible
        </a>
      </div>
    </section>
  );
}

function Author() {
  return (
    <section id="autora" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative reveal">
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-secondary/60 blur-xl" />
          <img
            src={bertaPortrait}
            alt="Retrato de Berta Moral Martín"
            className="w-full rounded-sm object-cover shadow-xl shadow-foreground/10"
          />
        </div>
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.35em] text-burgundy/80">
            La autora
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Sobre Berta Moral Martín
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              Berta Moral Martín debuta como escritora con{" "}
              <em>“Quédate conmigo”</em>, una novela nacida de la necesidad de
              transformar una experiencia vital en relato. Su escritura parte
              de lo íntimo, de lo cotidiano y de lo emocional, con una mirada
              honesta hacia los procesos de cambio, pérdida y reconstrucción.
            </p>
            <p>
              En su primera novela, Berta se atreve a mirar su propia historia
              con sensibilidad y convertirla en una narración capaz de
              acompañar a quienes también están aprendiendo a empezar de nuevo.
            </p>
          </div>
          <blockquote className="mt-10 border-l-2 border-burgundy pl-6 font-script text-2xl text-burgundy md:text-3xl">
            Escribir también puede ser una forma de quedarse.
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="newsletter" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-secondary/40 to-background" />
      <div className="mx-auto max-w-3xl px-6 text-center reveal">
        <p className="text-xs uppercase tracking-[0.35em] text-burgundy/80">
          Lanzamiento próximamente
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
          Sé de las primeras en leerla.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          <em>“Quédate conmigo”</em> estará disponible próximamente. Déjanos tu
          email y sé de las primeras personas en conocer la fecha de
          lanzamiento, leer fragmentos exclusivos y recibir novedades de Berta
          Moral Martín.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-3 text-left sm:grid-cols-2"
        >
          <input
            required
            type="text"
            placeholder="Tu nombre"
            className="rounded-full border border-border bg-background px-5 py-3.5 text-sm outline-none transition focus:border-burgundy"
          />
          <input
            required
            type="email"
            placeholder="Tu email"
            className="rounded-full border border-border bg-background px-5 py-3.5 text-sm outline-none transition focus:border-burgundy"
          />
          <button
            type="submit"
            className="sm:col-span-2 rounded-full bg-burgundy px-7 py-3.5 text-sm tracking-wide text-primary-foreground transition hover:opacity-90"
          >
            {submitted ? "Gracias por unirte ✦" : "Quiero estar dentro"}
          </button>
        </form>

        <p className="mt-5 text-xs text-muted-foreground">
          Sin spam. Solo noticias importantes sobre el libro, el lanzamiento y
          contenidos especiales de la autora.
        </p>
        <p className="mt-10 font-serif text-lg italic text-foreground/70">
          Fecha de lanzamiento: <span className="text-burgundy">próximamente</span>
        </p>
      </div>
    </section>
  );
}

function Community() {
  const blocks = [
    {
      title: "Lee antes que nadie",
      text: "Recibe fragmentos, avances y novedades exclusivas.",
    },
    {
      title: "Comparte el viaje",
      text: "Acompaña a Berta en el proceso de publicación de su primera novela.",
    },
    {
      title: "Forma parte del inicio",
      text: "Ayuda a que esta historia llegue a más personas.",
    },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl reveal">
          <p className="text-xs uppercase tracking-[0.35em] text-burgundy/80">
            Comunidad
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Acompaña el camino de la novela.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            El lanzamiento de una primera novela no empieza el día que se
            publica. Empieza cuando una historia encuentra a sus primeros
            lectores.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {blocks.map((b, i) => (
            <div key={b.title} className="reveal border-t border-burgundy pt-6">
              <span className="font-serif text-sm italic text-burgundy">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-serif text-2xl">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {b.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center reveal">
          <a
            href="#newsletter"
            className="inline-block rounded-full border border-foreground/20 px-7 py-3.5 text-sm tracking-wide text-foreground transition hover:border-burgundy hover:text-burgundy"
          >
            Unirme a la comunidad
          </a>
        </div>
      </div>
    </section>
  );
}

function Social() {
  const items = [
    { label: "Instagram", href: "#instagram" },
    { label: "TikTok", href: "#tiktok" },
    { label: "LinkedIn", href: "#linkedin" },
    { label: "Contacto", href: "mailto:contacto@bertamoral.com" },
  ];
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center reveal">
        <h2 className="font-serif text-3xl md:text-4xl">Sigue a Berta</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Reflexiones, proceso creativo, frases, lanzamiento y contenido detrás
          de la novela.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {items.map((i) => (
            <a
              key={i.label}
              href={i.href}
              className="rounded-full border border-foreground/20 px-6 py-2.5 text-sm transition hover:border-burgundy hover:text-burgundy"
            >
              {i.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contacto" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 md:grid-cols-2">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.35em] text-burgundy/80">
            Contacto y prensa
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Hablemos.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            Para entrevistas, colaboraciones, clubs de lectura, presentaciones,
            prensa o propuestas editoriales, puedes contactar con Berta Moral
            Martín.
          </p>
          <a
            href="mailto:contacto@bertamoral.com"
            className="mt-8 inline-block font-serif text-xl italic text-burgundy underline-offset-4 hover:underline"
          >
            contacto@bertamoral.com
          </a>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="reveal space-y-4 rounded-xl border border-border bg-card p-8"
        >
          <input
            required
            placeholder="Nombre"
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-burgundy"
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-burgundy"
          />
          <input
            placeholder="Motivo del contacto"
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-burgundy"
          />
          <textarea
            required
            placeholder="Mensaje"
            rows={5}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-burgundy"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-burgundy px-7 py-3.5 text-sm tracking-wide text-primary-foreground transition hover:opacity-90"
          >
            {sent ? "Mensaje enviado ✦" : "Enviar mensaje"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl">Berta Moral Martín</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Autora de <em>“Quédate conmigo”</em>. Una novela sobre amor,
            pérdida y reconstrucción.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-burgundy/80">
            Navegación
          </p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li><a href="#libro" className="hover:text-burgundy">El libro</a></li>
            <li><a href="#autora" className="hover:text-burgundy">La autora</a></li>
            <li><a href="#newsletter" className="hover:text-burgundy">Newsletter</a></li>
            <li><a href="#contacto" className="hover:text-burgundy">Contacto</a></li>
            <li><a href="#" className="hover:text-burgundy">Política de privacidad</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-burgundy/80">
            Contacto
          </p>
          <a
            href="mailto:contacto@bertamoral.com"
            className="mt-4 inline-block text-sm text-foreground/80 hover:text-burgundy"
          >
            contacto@bertamoral.com
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-border px-6 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Berta Moral Martín. Todos los derechos reservados.
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <AboutBook />
        <Premise />
        <BehindTheStory />
        <Themes />
        <ForYou />
        <Excerpt />
        <Author />
        <Newsletter />
        <Community />
        <Social />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
