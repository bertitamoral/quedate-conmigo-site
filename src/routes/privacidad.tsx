import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad | Berta Moral Martín" },
      {
        name: "description",
        content:
          "Información sobre el tratamiento de datos personales en la web de Berta Moral Martín.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="site-shell legal-page">
      <SiteHeader solid />
      <main id="contenido">
        <article className="legal-content">
          <Link className="back-link" to="/">
            <ArrowLeft aria-hidden="true" />
            Volver al inicio
          </Link>
          <p className="section-kicker">Información legal</p>
          <h1>Política de privacidad</h1>
          <p className="legal-updated">Última actualización: 18 de junio de 2026</p>

          <h2>Responsable del tratamiento</h2>
          <p>
            Berta Moral Martín es responsable de los datos enviados mediante los formularios de esta
            web. Para cualquier consulta puedes escribir a{" "}
            <a href="mailto:contacto@bertamoral.com">contacto@bertamoral.com</a>.
          </p>

          <h2>Datos que recogemos</h2>
          <p>
            El formulario de contacto recoge nombre, email, motivo y mensaje. La comunidad de
            lectores recoge nombre y email. El formulario de compra recoge además la dirección
            postal necesaria para gestionar el envío.
          </p>

          <h2>Finalidad y conservación</h2>
          <p>
            Los datos se utilizan exclusivamente para responder consultas, enviar novedades
            solicitadas y tramitar pedidos. Se conservarán durante el tiempo necesario para esa
            finalidad y para atender posibles obligaciones legales.
          </p>

          <h2>Base legal y comunicaciones</h2>
          <p>
            La base legal es tu consentimiento al enviar un formulario y, en el caso de pedidos, la
            ejecución de la solicitud de compra. No se venden datos a terceros. Los proveedores
            técnicos imprescindibles, como el servicio de correo o alojamiento, pueden tratarlos
            siguiendo nuestras instrucciones.
          </p>

          <h2>Tus derechos</h2>
          <p>
            Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad
            escribiendo al email indicado. También puedes retirar tu consentimiento en cualquier
            momento.
          </p>

          <h2>Seguridad</h2>
          <p>
            Se aplican medidas razonables para proteger la información. Esta página deberá revisarse
            con los datos fiscales y legales definitivos de la responsable antes del lanzamiento.
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
