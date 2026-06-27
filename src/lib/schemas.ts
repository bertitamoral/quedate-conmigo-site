import { z } from "zod";

export const newsletterSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(80),
  email: z.string().trim().email("Escribe un email valido.").max(160),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(80),
  email: z.string().trim().email("Escribe un email valido.").max(160),
  subject: z.string().trim().max(120).optional().default("Contacto desde la web"),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres.").max(3000),
});

export const orderSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(100),
  address: z.string().trim().min(5, "Escribe la calle y el numero.").max(180),
  addressExtra: z.string().trim().max(120).optional().default(""),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "El codigo postal debe tener 5 cifras."),
  city: z.string().trim().min(2, "Escribe la localidad.").max(100),
  province: z.string().trim().min(2, "Escribe la provincia.").max(100),
  country: z.string().trim().min(2, "Escribe el pais.").max(100).default("España"),
  email: z.string().trim().email("Escribe un email valido.").max(160),
});

export const paymentMethodSchema = z.enum(["bizum", "wallapop"]);

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
