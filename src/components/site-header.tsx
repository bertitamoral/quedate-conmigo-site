import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/#libro", label: "El libro" },
  { href: "/#historia", label: "La historia" },
  { href: "/#autora", label: "La autora" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(solid);

  useEffect(() => {
    if (solid) return;
    const handleScroll = () => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [solid]);

  return (
    <header className={`site-header ${scrolled || open ? "site-header-solid" : ""}`}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <div className="site-header-inner">
        <Link className="site-wordmark" to="/">
          <span>Berta Moral Martín</span>
          <small>Escritora</small>
        </Link>

        <nav aria-label="Navegación principal" className="site-nav">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a className="button button-primary button-compact" href="/#contacto">
            Contactar
          </a>
        </nav>

        <button
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="icon-button site-menu-button"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav aria-label="Navegación móvil" className="site-mobile-nav">
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="button button-primary" href="/#contacto" onClick={() => setOpen(false)}>
            Contactar
          </a>
        </nav>
      ) : null}
    </header>
  );
}
