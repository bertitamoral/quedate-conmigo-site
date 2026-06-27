import { createServerFn } from "@tanstack/react-start";

import {
  contactSchema,
  newsletterSchema,
  orderSchema,
  paymentMethodSchema,
  type OrderInput,
  type PaymentMethod,
} from "@/lib/schemas";
import { getSupabaseServerClient } from "@/lib/supabase";

const SHIPPING_COST = 0.75;

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

function formatEuro(amount: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount);
}

function getPricing() {
  const bookPrice = Number.parseFloat(process.env.BOOK_PRICE ?? "");
  const hasPrice = Number.isFinite(bookPrice);
  const total = hasPrice ? bookPrice + SHIPPING_COST : null;

  return {
    bookPrice: hasPrice ? bookPrice : null,
    shipping: SHIPPING_COST,
    total,
    priceLabel: hasPrice ? formatEuro(bookPrice) : "",
    shippingLabel: formatEuro(SHIPPING_COST),
    totalLabel: total !== null ? formatEuro(total) : "",
  };
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

async function insertOrder(order: OrderInput, paymentMethod: PaymentMethod) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const pricing = getPricing();
  const { error } = await supabase.from("orders").insert({
    name: order.name,
    email: order.email,
    address: order.address,
    address_extra: order.addressExtra || null,
    postal_code: order.postalCode,
    city: order.city,
    province: order.province,
    country: order.country,
    payment_method: paymentMethod,
    book_price: pricing.bookPrice,
    shipping_price: pricing.shipping,
    total_price: pricing.total,
  });

  if (error) console.error("Supabase order insert failed", error);
}

const paymentMethodLabels: Record<PaymentMethod, string> = {
  bizum: "Bizum",
  wallapop: "Wallapop",
};

async function sendCheckoutNotification(order: OrderInput, paymentMethod: PaymentMethod) {
  const addressLine = [
    order.address,
    order.addressExtra,
    `${order.postalCode} ${order.city}`,
    order.province,
    order.country,
  ]
    .filter(Boolean)
    .join(", ");

  const result = await deliverEmail({
    to: process.env.EMAIL_CHECKOUT,
    subject: `Nuevo pedido por ${paymentMethodLabels[paymentMethod]}: ${order.name}`,
    replyTo: order.email,
    html: `
      <h1>Nuevo pedido por ${paymentMethodLabels[paymentMethod]}</h1>
      <p><strong>Nombre:</strong> ${escapeHtml(order.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(order.email)}</p>
      <p><strong>Direccion de envio:</strong> ${escapeHtml(addressLine)}</p>
    `,
  });

  if (!result.ok) {
    console.error(`Checkout notification email failed (${paymentMethod})`, result.error);
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

const recordOrderSchema = orderSchema.extend({ paymentMethod: paymentMethodSchema });

/** Registra el pedido en Supabase antes de redirigir a Wallapop. */
export const recordOrderAttempt = createServerFn({ method: "POST" })
  .inputValidator(recordOrderSchema)
  .handler(async ({ data }) => {
    const { paymentMethod, ...order } = data;
    await insertOrder(order, paymentMethod);
    await sendCheckoutNotification(order, paymentMethod);
    return { ok: true as const };
  });

export const sendBizumOrder = createServerFn({ method: "POST" })
  .inputValidator(orderSchema)
  .handler(async ({ data }) => {
    await insertOrder(data, "bizum");
    await sendCheckoutNotification(data, "bizum");

    const pricing = getPricing();

    return {
      ok: true as const,
      payment: {
        phone: process.env.BIZUM_PHONE ?? "",
        price: pricing.priceLabel,
        shipping: pricing.shippingLabel,
        total: pricing.totalLabel,
        concept: `Quedate conmigo - ${data.name}`,
      },
    };
  });

export const getPurchaseConfig = createServerFn({ method: "GET" }).handler(async () => {
  const pricing = getPricing();

  return {
    bizumAvailable: Boolean(
      process.env.BIZUM_PHONE && pricing.bookPrice !== null && process.env.EMAIL_CHECKOUT,
    ),
    wallapopAvailable: Boolean(process.env.WALLAPOP_CHECKOUT_URL),
    wallapopUrl: process.env.WALLAPOP_CHECKOUT_URL ?? "",
    price: pricing.priceLabel,
    shipping: pricing.shippingLabel,
    total: pricing.totalLabel,
  };
});
