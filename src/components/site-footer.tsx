import { Instagram, Linkedin, Mail } from "lucide-react";

import { TikTokIcon } from "@/components/tiktok-icon";

const socialLinks = [
  {
    label: "Instagram",
    href: import.meta.env.VITE_INSTAGRAM_URL,
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: import.meta.env.VITE_TIKTOK_URL,
    icon: TikTokIcon,
  },
  {
    label: "LinkedIn",
    href: import.meta.env.VITE_LINKEDIN_URL,
    icon: Linkedin,
  },
].filter((item) => Boolean(item.href));

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div>
          <p className="site-footer-name">Berta Moral Martín</p>
          <p className="site-footer-copy">
            Autora de <em>Quédate conmigo</em>, una novela sobre amor, pérdida y reconstrucción.
          </p>
        </div>

        <nav aria-label="Navegación del pie" className="site-footer-links">
          <a href="/#libro">El libro</a>
          <a href="/#autora">La autora</a>
          <a href="/#contacto">Contacto</a>
          <Link to="/privacidad">Privacidad</Link>
        </nav>

        <div className="site-footer-contact">
          <a href="mailto:contacto@bertamoral.com">
            <Mail aria-hidden="true" className="size-4" />
            contacto@bertamoral.com
          </a>
          {socialLinks.length ? (
            <div className="social-icon-row">
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
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© 2026 Berta Moral Martín</span>
        <span>Primera edición · UNO Editorial</span>
      </div>
    </footer>
  );
}
