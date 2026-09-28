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

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
