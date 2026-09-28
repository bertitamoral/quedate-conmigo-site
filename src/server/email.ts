import { createServerFn } from "@tanstack/react-start";

import { contactSchema, newsletterSchema } from "@/lib/schemas";
import { getSupabaseServerClient } from "@/lib/supabase";

type ActionResult =
  | { ok: true }
  | { ok: false; error: string; code: "NOT_CONFIGURED" | "DELIVERY_FAILED" };

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

async function deliverEmail(options: {
  to: string | undefined;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<ActionResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from || !options.to) {
    return {
      ok: false,
      code: "NOT_CONFIGURED",
      error: "El envio aun no esta configurado. Escribenos directamente por email.",
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    if (error) {
      console.error("Resend delivery failed", error);
      return {
        ok: false,
        code: "DELIVERY_FAILED",
        error: "No hemos podido enviar el mensaje. Prueba de nuevo en unos minutos.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Email delivery failed", error);
    return {
      ok: false,
      code: "DELIVERY_FAILED",
      error: "No hemos podido enviar el mensaje. Prueba de nuevo en unos minutos.",
    };
  }
}

async function insertNewsletterSubscriber(name: string, email: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ name, email }, { onConflict: "email" });

  if (error) console.error("Supabase newsletter insert failed", error);
}

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator(newsletterSchema)
  .handler(async ({ data }) => {
    await insertNewsletterSubscriber(data.name, data.email);

    return deliverEmail({
      to: process.env.CONTACT_EMAIL_TO,
      subject: `Nueva lectora: ${data.name}`,
      replyTo: data.email,
      html: `
        <h1>Nueva alta desde la web</h1>
        <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      `,
    });
  });

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) =>
    deliverEmail({
      to: process.env.CONTACT_EMAIL_TO,
      subject: `Web Berta Moral: ${data.subject || "Nuevo mensaje"}`,
      replyTo: data.email,
      html: `
        <h1>Nuevo mensaje desde la web</h1>
        <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Motivo:</strong> ${escapeHtml(data.subject || "Sin especificar")}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
      `,
    }),
  );

