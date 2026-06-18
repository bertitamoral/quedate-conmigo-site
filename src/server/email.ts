import { createServerFn } from "@tanstack/react-start";

import { contactSchema, newsletterSchema, orderSchema } from "@/lib/schemas";

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

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator(newsletterSchema)
  .handler(async ({ data }) =>
    deliverEmail({
      to: process.env.CONTACT_EMAIL_TO,
      subject: `Nueva lectora: ${data.name}`,
      replyTo: data.email,
      html: `
        <h1>Nueva alta desde la web</h1>
        <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      `,
    }),
  );

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

export const sendBizumOrder = createServerFn({ method: "POST" })
  .inputValidator(orderSchema)
  .handler(async ({ data }) => {
    const result = await deliverEmail({
      to: process.env.ORDER_EMAIL_TO,
      subject: `Nuevo pedido de ${data.name}`,
      replyTo: data.email,
      html: `
        <h1>Nuevo pedido de "Quedate conmigo"</h1>
        <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Direccion:</strong> ${escapeHtml(data.address)}</p>
        ${data.addressExtra ? `<p><strong>Informacion adicional:</strong> ${escapeHtml(data.addressExtra)}</p>` : ""}
        <p><strong>Codigo postal:</strong> ${escapeHtml(data.postalCode)}</p>
        <p><strong>Localidad:</strong> ${escapeHtml(data.city)}</p>
        <p><strong>Provincia:</strong> ${escapeHtml(data.province)}</p>
      `,
    });

    if (!result.ok) return result;

    return {
      ok: true as const,
      payment: {
        phone: process.env.BIZUM_PHONE ?? "",
        price: process.env.BOOK_PRICE ?? "",
        shipping: process.env.SHIPPING_PRICE ?? "",
        concept: `Quedate conmigo - ${data.name}`,
      },
    };
  });

export const getPurchaseConfig = createServerFn({ method: "GET" }).handler(async () => ({
  bizumAvailable: Boolean(
    process.env.BIZUM_PHONE && process.env.BOOK_PRICE && process.env.ORDER_EMAIL_TO,
  ),
  wallapopAvailable: Boolean(process.env.WALLAPOP_CHECKOUT_URL),
  wallapopUrl: process.env.WALLAPOP_CHECKOUT_URL ?? "",
  price: process.env.BOOK_PRICE ?? "",
  shipping: process.env.SHIPPING_PRICE ?? "",
}));
