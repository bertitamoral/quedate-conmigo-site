import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import { type FormEvent, useState } from "react";

import { FormStatus } from "@/components/form-status";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { newsletterSchema } from "@/lib/schemas";
import { subscribeNewsletter } from "@/server/email";

export const Route = createFileRoute("/gracias")({
  head: () => ({
    meta: [{ title: "Gracias | Berta Moral Martín" }],
  }),
  component: ThanksPage,
});

function ThanksPage() {
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
    setState({ type: "success", message: "Te avisaremos en cuanto haya novedades." });
  }

  return (
    <div className="site-shell purchase-page">
      <SiteHeader solid />
      <main className="purchase-main" id="contenido">
        <div className="purchase-success thanks-success">
          <span className="success-icon">
            <Heart aria-hidden="true" />
          </span>
          <p className="section-kicker">Pedido en marcha</p>
          <h1>Muchas gracias.</h1>
          <p>Espero que disfrutes de "Quédate conmigo" tanto como yo disfruté escribiéndolo.</p>

          <div className="thanks-newsletter">
            <p className="section-kicker">La siguiente novela está en camino</p>
            <h2>¿Quieres ser de las primeras en saberlo?</h2>
            <p>
              Déjame tu nombre y email para avisarte de la próxima novela, regalos y convocatorias
              de firmas.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="thanks-name">Nombre</label>
                <input autoComplete="name" id="thanks-name" name="name" required />
              </div>
              <div className="field">
                <label htmlFor="thanks-email">Email</label>
                <input autoComplete="email" id="thanks-email" name="email" required type="email" />
              </div>
              <button
                className="button button-primary"
                disabled={state.type === "loading"}
                type="submit"
              >
                {state.type === "loading" ? "Enviando..." : "Avísame de la próxima novela"}
                <ArrowRight aria-hidden="true" />
              </button>
              {state.type === "success" || state.type === "error" ? (
                <FormStatus
                  message={state.message ?? ""}
                  status={state.type === "success" ? "success" : "error"}
                />
              ) : null}
            </form>
          </div>

          <Link className="back-step" to="/">
            Volver al inicio
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
