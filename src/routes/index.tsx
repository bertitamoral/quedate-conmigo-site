import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, BookOpen, Instagram, Linkedin, Mail, Quote } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

import bertaPortrait from "@/assets/berta-portrait.jpg";
import bertaWriting from "@/assets/berta-writing.jpg";
import coverFinal from "@/assets/quedate-conmigo-cover-final.jpg";
import fullCover from "@/assets/quedate-conmigo-full-cover.jpg";
import { FormStatus } from "@/components/form-status";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TikTokIcon } from "@/components/tiktok-icon";
import { contactSchema, newsletterSchema } from "@/lib/schemas";
import { sendContactMessage, subscribeNewsletter } from "@/server/email";

const siteUrl = import.meta.env.VITE_SITE_URL || "https://bertamoral.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quédate conmigo | Berta Moral Martín" },
      {
        name: "description",
        content:
          "Descubre Quédate conmigo, la primera novela de Berta Moral Martín. Una historia autobiográfica sobre amor, ruptura, identidad y reconstrucción personal.",
      },
      {
        name: "keywords",
        content:
          "Berta Moral Martín, Quédate conmigo, novela autobiográfica, novela sobre ruptura, novela emocional, literatura contemporánea, reconstrucción personal",
      },
      { property: "og:title", content: "Quédate conmigo | Berta Moral Martín" },
      {
        property: "og:description",
        content: "Una novela sobre el amor, la pérdida y la valentía de volver a elegirse.",
      },
      { property: "og:type", content: "book" },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: `${siteUrl}/og-quedate-conmigo.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${siteUrl}/og-quedate-conmigo.jpg` },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
  }),
  component: IndexPage,
});

const themes = [
  ["Ruptura", "Cuando una relación termina, también se rompe una versión de quien eras."],
  ["Identidad", "La pregunta no es solo qué ha pasado, sino quién soy después de esto."],
  ["Amor", "Refugio, herida y aprendizaje. Sin idealizar lo que duele."],
  ["Salud mental", "El proceso invisible de sostenerse cuando todo se mueve por dentro."],
  ["Vínculos", "La familia y las amistades que acompañan, sostienen y transforman."],
  ["Reconstrucción", "Volver a empezar no siempre es épico. A veces es levantarse un día más."],
];

const socialLinks = [
  { label: "Instagram", href: import.meta.env.VITE_INSTAGRAM_URL, icon: Instagram },
  { label: "TikTok", href: import.meta.env.VITE_TIKTOK_URL, icon: TikTokIcon },
  { label: "LinkedIn", href: import.meta.env.VITE_LINKEDIN_URL, icon: Linkedin },
].filter((item) => Boolean(item.href));

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      elements.forEach((element) => element.setAttribute("data-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <img
        alt="Portada de Quédate conmigo con una mujer caminando hacia Barcelona"
        className="hero-background"
        fetchPriority="high"
        src={coverFinal}
      />
      <div className="hero-shade" />
      <div className="hero-content" data-reveal data-visible="true">
        <p className="hero-author">La primera novela de Berta Moral Martín</p>
        <h1>
          Quédate
          <span>conmigo</span>
        </h1>
        <p className="hero-lead">
          Una historia sobre el amor, la pérdida y la valentía de volver a elegirse.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="/#contacto">
            Contactar a Berta
            <ArrowRight aria-hidden="true" />
          </a>
          <a className="button button-on-dark" href="#libro">
            Descubrir la historia
          </a>
        </div>
        <p className="hero-availability">Primera edición · UNO Editorial</p>
      </div>
      <a aria-label="Continuar hacia el contenido" className="hero-scroll" href="#libro">
        <ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}

function BookIntroduction() {
  return (
    <section className="section book-intro" id="libro">
      <div className="section-number" aria-hidden="true">
        01
      </div>
      <div className="book-intro-copy" data-reveal>
        <p className="section-kicker">La novela</p>
        <h2>
          Hay momentos en los que quedarse significa <em>volver a una misma.</em>
        </h2>
        <div className="prose-columns">
          <p>
            <strong>Quédate conmigo</strong> nace en un momento de ruptura y cambio. Es una historia
            sobre el amor, pero también sobre la identidad, la pérdida y la reconstrucción personal.
          </p>
          <p>
            A través de sus páginas, Berta convierte lo vivido en palabra, y la palabra en una forma
            de comprender, atravesar y empezar de nuevo.
          </p>
        </div>
        <a className="text-link" href="/#contacto">
          Contactar a Berta <ArrowRight aria-hidden="true" />
        </a>
      </div>
      <dl className="book-facts" data-reveal>
        <div>
          <dt>Género</dt>
          <dd>Narrativa autobiográfica con elementos de ficción</dd>
        </div>
        <div>
          <dt>Temas</dt>
          <dd>Amor, identidad, salud mental, familia y reconstrucción</dd>
        </div>
        <div>
          <dt>Edición</dt>
          <dd>UNO Editorial · ISBN 979-13-88148-31-6</dd>
        </div>
      </dl>
    </section>
  );
}

function FullCoverSection() {
  return (
    <section className="cover-spread-section" id="historia">
      <div className="cover-spread-copy" data-reveal>
        <Quote aria-hidden="true" />
        <blockquote>
          <strong>Hay historias que no comienzan cuando dos personas se encuentran, sino cuando una decide
          quedarse.</strong>
        </blockquote>
        <p>
          En una ciudad que respira memoria y futuro, la protagonista debe enfrentarse a la pregunta
          más íntima: ¿quedarse es un acto de amor o de miedo?
        </p>
      </div>
      <figure className="cover-spread-figure" data-reveal>
        <img
          alt="Cubierta completa de Quédate conmigo, con contraportada, lomo y portada"
          loading="lazy"
          src={fullCover}
        />
        <figcaption>Cubierta completa de la primera edición</figcaption>
      </figure>
    </section>
  );
}

function StorySection() {
  return (
    <section className="section story-section">
      <div className="story-image-stack" data-reveal>
        <img
          alt="Berta Moral Martín escribiendo junto a una ventana"
          className="story-image-main"
          loading="lazy"
          src={bertaWriting}
        />
      </div>
      <div className="story-copy" data-reveal>
        <p className="section-kicker">Detrás de la historia</p>
        <h2>Esta novela nace de una necesidad: ordenar lo vivido.</h2>
        <p>
          Separación, dudas, afectos, pérdidas, familia, amistades y salud mental se convierten en
          materia narrativa. La protagonista no solo debe comprender lo que ha perdido, también
          descubrir quién quiere ser a partir de ahora.
        </p>
        <p>
          Es un viaje emocional reconocible para quien haya amado, dudado y tenido que reconstruir
          una vida que ya no se parecía a la que imaginaba.
        </p>
      </div>
    </section>
  );
}

function ThemesSection() {
  return (
    <section className="themes-section">
      <div className="themes-heading" data-reveal>
        <p className="section-kicker">Lo que atraviesa la novela</p>
        <h2>Seis heridas. Seis formas de volver a empezar.</h2>
      </div>
      <ol className="themes-list">
        {themes.map(([title, description], index) => (
          <li data-reveal key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function AuthorSection() {
  return (
    <section className="author-section" id="autora">
      <div className="author-portrait-wrap" data-reveal>
        <img
          alt="Berta Moral Martín sonriendo junto a un ramo de flores"
          className="author-portrait"
          loading="lazy"
          src={bertaPortrait}
        />
        <p className="author-caption">Sant Adrià de Besòs, Barcelona · 1992</p>
      </div>
      <div className="author-copy" data-reveal>
        <p className="section-kicker">La autora</p>
        <h2>Berta Moral Martín</h2>
        <p className="author-intro">
          Profesora de atención a la diversidad y psicopedagoga. Catalana, con raíces conquenses y
          extremeñas.
        </p>
        <p>
          Creció en una familia vinculada a la docencia, un entorno que marcó su vocación por la
          educación y el acompañamiento. La maternidad transformó su manera de entender la vida.
        </p>
        <p>
          <em>Quédate conmigo</em> es su primer libro: un relato autobiográfico que convierte un
          momento de ruptura en una búsqueda de identidad, honestidad y reconstrucción.
        </p>
        <blockquote>“Escribir también puede ser una forma de quedarse.”</blockquote>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [state, setState] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = newsletterSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
    });

    if (!parsed.success) {
      setState({ type: "error", message: parsed.error.issues[0]?.message });
      return;
    }

    setState({ type: "loading" });
    const result = await subscribeNewsletter({ data: parsed.data });

    if (!result.ok) {
      setState({ type: "error", message: result.error });
      return;
    }

    form.reset();
    setState({
      type: "success",
      message: "Ya formas parte de la comunidad de lectoras de Berta.",
    });
  }

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="newsletter-copy" data-reveal>
        <BookOpen aria-hidden="true" />
        <p className="section-kicker">Acompaña a Berta</p>
        <h2>La historia continúa fuera de las páginas.</h2>
        <p>
          Recibe noticias del próximo libro, encuentros, firmas, fragmentos y contenidos que Berta
          comparte solo con su comunidad.
        </p>
      </div>
      <form className="newsletter-form" data-reveal onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="newsletter-name">Nombre</label>
          <input autoComplete="name" id="newsletter-name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="newsletter-email">Email</label>
          <input autoComplete="email" id="newsletter-email" name="email" required type="email" />
        </div>
        <button className="button button-light" disabled={state.type === "loading"} type="submit">
          {state.type === "loading" ? "Enviando..." : "Unirme a la comunidad"}
          <ArrowRight aria-hidden="true" />
        </button>
        <p className="form-privacy">
          Sin spam. Al enviar aceptas nuestra <Link to="/privacidad">política de privacidad</Link>.
        </p>
        {state.type === "success" || state.type === "error" ? (
          <FormStatus
            message={state.message ?? ""}
            status={state.type === "success" ? "success" : "error"}
          />
        ) : null}
      </form>
    </section>
  );
}

function ContactSection() {
  const [state, setState] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    });

    if (!parsed.success) {
      setState({ type: "error", message: parsed.error.issues[0]?.message });
      return;
    }

    setState({ type: "loading" });
    const result = await sendContactMessage({ data: parsed.data });

    if (!result.ok) {
      setState({ type: "error", message: result.error });
      return;
    }

    form.reset();
    setState({ type: "success", message: "Mensaje enviado. Berta te responderá pronto." });
  }

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-copy" data-reveal>
        <p className="section-kicker">Contacto y prensa</p>
        <h2>Hablemos de libros, encuentros y nuevas historias.</h2>
        <p>Para entrevistas, clubs de lectura, presentaciones, prensa o propuestas editoriales.</p>
        <a className="contact-email" href="mailto:contacto@bertamoral.com">
          <Mail aria-hidden="true" />
          contacto@bertamoral.com
        </a>
        {socialLinks.length ? (
          <div className="contact-social">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                aria-label={label}
                href={href}
                key={label}
                rel="noreferrer"
                target="_blank"
                title={label}
              >
                <Icon className="size-5" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
      <form className="contact-form" data-reveal onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="contact-name">Nombre</label>
          <input autoComplete="name" id="contact-name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input autoComplete="email" id="contact-email" name="email" required type="email" />
        </div>
        <div className="field field-wide">
          <label htmlFor="contact-subject">Motivo</label>
          <input id="contact-subject" name="subject" placeholder="Prensa, club de lectura..." />
        </div>
        <div className="field field-wide">
          <label htmlFor="contact-message">Mensaje</label>
          <textarea id="contact-message" name="message" required rows={5} />
        </div>
        <button className="button button-primary field-wide" disabled={state.type === "loading"}>
          {state.type === "loading" ? "Enviando..." : "Enviar mensaje"}
          <ArrowRight aria-hidden="true" />
        </button>
        {state.type === "success" || state.type === "error" ? (
          <div className="field-wide">
            <FormStatus
              message={state.message ?? ""}
              status={state.type === "success" ? "success" : "error"}
            />
          </div>
        ) : null}
      </form>
    </section>
  );
}

function PurchaseBand() {
  return (
    <section className="purchase-band">
      <div data-reveal>
        <p>Primera edición</p>
        <h2>Una historia para leer. Una decisión para recordar.</h2>
      </div>
      <a className="button button-light" data-reveal href="/#contacto">
        Contactar a Berta
        <ArrowRight aria-hidden="true" />
      </a>
    </section>
  );
}

function IndexPage() {
  useReveal();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <BookIntroduction />
        <FullCoverSection />
        <StorySection />
        <ThemesSection />
        <AuthorSection />
        <NewsletterSection />
        <ContactSection />
        <PurchaseBand />
      </main>
      <SiteFooter />
    </div>
  );
}
