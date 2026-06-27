import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  ExternalLink,
  LoaderCircle,
  MapPin,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import coverFinal from "@/assets/quedate-conmigo-cover-final.jpg";
import { FormStatus } from "@/components/form-status";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { orderSchema, type OrderInput } from "@/lib/schemas";
import { getPurchaseConfig, recordOrderAttempt, sendBizumOrder } from "@/server/email";

const siteUrl = import.meta.env.VITE_SITE_URL || "https://bertamoral.com";

export const Route = createFileRoute("/comprar")({
  loader: () => getPurchaseConfig(),
  head: () => ({
    meta: [
      { title: "Comprar Quédate conmigo | Berta Moral Martín" },
      {
        name: "description",
        content:
          "Compra o reserva Quédate conmigo, la primera novela de Berta Moral Martín. Elige pago manual por Bizum o compra mediante Wallapop.",
      },
      { property: "og:title", content: "Comprar Quédate conmigo" },
      { property: "og:image", content: `${siteUrl}/og-quedate-conmigo.jpg` },
    ],
    links: [{ rel: "canonical", href: `${siteUrl}/comprar` }],
  }),
  component: PurchasePage,
});

function PurchasePage() {
  const config = Route.useLoaderData();
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "method" | "bizum-success">("details");
  const [order, setOrder] = useState<OrderInput | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState<{
    phone: string;
    price: string;
    shipping: string;
    total: string;
    concept: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      addressExtra: "",
      postalCode: "",
      city: "",
      province: "",
      country: "España",
    },
  });

  useEffect(() => {
    if (step !== "bizum-success") return;
    const timeout = window.setTimeout(() => navigate({ to: "/gracias" }), 12000);
    return () => window.clearTimeout(timeout);
  }, [navigate, step]);

  function continueToPayment(data: OrderInput) {
    setOrder(data);
    setError("");
    setStep("method");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function chooseBizum() {
    if (!order) return;
    setSubmitting(true);
    setError("");

    const result = await sendBizumOrder({ data: order });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setPayment(result.payment);
    setStep("bizum-success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseWallapop() {
    if (!order || !config.wallapopUrl) return;
    window.open(config.wallapopUrl, "_blank", "noopener,noreferrer");
    void recordOrderAttempt({ data: { ...order, paymentMethod: "wallapop" } });
  }

  async function choosePaypal() {
    if (!order || !config.paypalUrl) return;
    setSubmitting(true);
    await recordOrderAttempt({ data: { ...order, paymentMethod: "paypal" } }).catch(() => {});
    window.location.assign(config.paypalUrl);
  }

  return (
    <div className="site-shell purchase-page">
      <SiteHeader solid />
      <main className="purchase-main" id="contenido">
        <Link className="back-link" to="/">
          <ArrowLeft aria-hidden="true" />
          Volver a la web
        </Link>

        <div className="purchase-layout">
          <aside className="purchase-summary">
            <div className="purchase-cover-wrap">
              <img alt="Portada de Quédate conmigo" src={coverFinal} />
            </div>
            <div>
              <p className="section-kicker">Primera edición</p>
              <h1>Quédate conmigo</h1>
              <p>de Berta Moral Martín</p>
              <dl>
                <div>
                  <dt>Libro</dt>
                  <dd>{config.price || "Precio por confirmar"}</dd>
                </div>
                <div>
                  <dt>Envío</dt>
                  <dd>{config.shipping || "Se confirma al tramitar el pedido"}</dd>
                </div>
              </dl>
            </div>
          </aside>

          <section className="purchase-flow">
            <div className="purchase-progress" aria-label="Progreso de compra">
              <span className={step === "details" ? "active" : "complete"}>1</span>
              <div />
              <span
                className={
                  step === "method" ? "active" : step === "bizum-success" ? "complete" : ""
                }
              >
                2
              </span>
              <div />
              <span className={step === "bizum-success" ? "active" : ""}>3</span>
            </div>

            {step === "details" ? (
              <>
                <div className="purchase-heading">
                  <p className="section-kicker">Datos de envío</p>
                  <h2>¿Dónde quieres recibir el libro?</h2>
                  <p>Usaremos estos datos únicamente para gestionar y enviar tu pedido.</p>
                </div>

                <form className="purchase-form" onSubmit={handleSubmit(continueToPayment)}>
                  <div className="field field-wide">
                    <label htmlFor="order-name">Nombre y apellidos</label>
                    <input autoComplete="name" id="order-name" {...register("name")} />
                    {errors.name ? <small>{errors.name.message}</small> : null}
                  </div>
                  <div className="field field-wide">
                    <label htmlFor="order-email">Email</label>
                    <input
                      autoComplete="email"
                      id="order-email"
                      type="email"
                      {...register("email")}
                    />
                    {errors.email ? <small>{errors.email.message}</small> : null}
                  </div>
                  <div className="field field-wide">
                    <label htmlFor="order-address">Calle, número y piso</label>
                    <input
                      autoComplete="street-address"
                      id="order-address"
                      {...register("address")}
                    />
                    {errors.address ? <small>{errors.address.message}</small> : null}
                  </div>
                  <div className="field field-wide">
                    <label htmlFor="order-extra">Información adicional</label>
                    <input
                      id="order-extra"
                      placeholder="Escalera, puerta, indicaciones..."
                      {...register("addressExtra")}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="order-postal">Código postal</label>
                    <input
                      autoComplete="postal-code"
                      id="order-postal"
                      inputMode="numeric"
                      {...register("postalCode")}
                    />
                    {errors.postalCode ? <small>{errors.postalCode.message}</small> : null}
                  </div>
                  <div className="field">
                    <label htmlFor="order-city">Localidad</label>
                    <input autoComplete="address-level2" id="order-city" {...register("city")} />
                    {errors.city ? <small>{errors.city.message}</small> : null}
                  </div>
                  <div className="field field-wide">
                    <label htmlFor="order-province">Provincia</label>
                    <input
                      autoComplete="address-level1"
                      id="order-province"
                      {...register("province")}
                    />
                    {errors.province ? <small>{errors.province.message}</small> : null}
                  </div>
                  <div className="field field-wide">
                    <label htmlFor="order-country">País</label>
                    <input
                      autoComplete="country-name"
                      id="order-country"
                      {...register("country")}
                    />
                    {errors.country ? <small>{errors.country.message}</small> : null}
                  </div>

                  <div className="purchase-privacy field-wide">
                    <ShieldCheck aria-hidden="true" />
                    <p>
                      Tus datos se usan solo para gestionar el pedido. Consulta la{" "}
                      <Link to="/privacidad">política de privacidad</Link>.
                    </p>
                  </div>

                  <button className="button button-primary field-wide" type="submit">
                    Elegir forma de pago
                    <ArrowRight aria-hidden="true" />
                  </button>
                </form>
              </>
            ) : null}

            {step === "method" ? (
              <>
                <div className="purchase-heading">
                  <p className="section-kicker">Forma de compra</p>
                  <h2>Elige cómo quieres completar el pedido.</h2>
                  <p>
                    Con Bizum registramos primero tu dirección. PayPal y Wallapop te llevan a su
                    propio entorno de pago.
                  </p>
                </div>

                {config.total ? (
                  <div className="purchase-total">
                    <span>Importe final</span>
                    <strong>{config.total}</strong>
                    <small>
                      {config.price} libro + {config.shipping} gastos de envío
                    </small>
                  </div>
                ) : null}

                <div className="payment-options">
                  <button
                    className="payment-option"
                    disabled={!config.bizumAvailable || submitting}
                    onClick={chooseBizum}
                    type="button"
                  >
                    <Smartphone aria-hidden="true" />
                    <span>
                      <strong>Pagar por Bizum</strong>
                      <small>
                        {config.bizumAvailable
                          ? "Pedido manual y confirmación por email"
                          : "Disponible al configurar los datos de pago"}
                      </small>
                    </span>
                    {submitting ? (
                      <LoaderCircle aria-hidden="true" className="spin" />
                    ) : (
                      <ArrowRight aria-hidden="true" />
                    )}
                  </button>

                  <button
                    className="payment-option"
                    disabled={!config.paypalAvailable || submitting}
                    onClick={choosePaypal}
                    type="button"
                  >
                    <CreditCard aria-hidden="true" />
                    <span>
                      <strong>Pagar por PayPal</strong>
                      <small>
                        {config.paypalAvailable
                          ? "Pago a través de PayPal"
                          : "Enlace pendiente de configuración"}
                      </small>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </button>

                  <button
                    className="payment-option"
                    disabled={!config.wallapopAvailable}
                    onClick={chooseWallapop}
                    type="button"
                  >
                    <ExternalLink aria-hidden="true" />
                    <span>
                      <strong>Comprar en Wallapop</strong>
                      <small>
                        {config.wallapopAvailable
                          ? "Se abre en una pestaña nueva"
                          : "Enlace pendiente de configuración"}
                      </small>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>

                {error ? <FormStatus message={error} status="error" /> : null}

                <button
                  className="back-step"
                  onClick={() => {
                    setError("");
                    setStep("details");
                  }}
                  type="button"
                >
                  <ArrowLeft aria-hidden="true" />
                  Revisar los datos
                </button>
              </>
            ) : null}

            {step === "bizum-success" && payment ? (
              <div className="purchase-success">
                <span className="success-icon">
                  <Check aria-hidden="true" />
                </span>
                <p className="section-kicker">Pedido registrado</p>
                <h2>Gracias, {order?.name.split(" ")[0]}.</h2>
                <p>
                  Envía un Bizum de <strong>{payment.total || payment.price}</strong>
                  {payment.shipping
                    ? ` (${payment.price} del libro + ${payment.shipping} de gastos de envío)`
                    : ""}{" "}
                  al número <strong>{payment.phone}</strong>. El libro se enviará cuando el pago
                  quede confirmado.
                </p>
                <dl className="bizum-details">
                  <div>
                    <dt>Teléfono</dt>
                    <dd>{payment.phone}</dd>
                  </div>
                  <div>
                    <dt>Importe total</dt>
                    <dd>
                      {payment.total || payment.price}
                      {payment.shipping ? ` (${payment.price} + ${payment.shipping} de envío)` : ""}
                    </dd>
                  </div>
                  <div>
                    <dt>Concepto</dt>
                    <dd>{payment.concept}</dd>
                  </div>
                </dl>
                <p className="success-note">
                  También hemos avisado a Berta de tu pedido. Te llevamos a la página de
                  agradecimiento automáticamente.
                </p>
                <Link className="button button-primary" to="/gracias">
                  Continuar
                </Link>
              </div>
            ) : null}
          </section>
        </div>

        <div className="purchase-assurance">
          <MapPin aria-hidden="true" />
          <p>
            Envío desde Barcelona. Los plazos y gastos definitivos se confirman antes de preparar el
            ejemplar.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
