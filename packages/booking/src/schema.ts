import { z } from "zod";
import { AUDIENCE_IDS, BILLINGS, FORMAT_IDS, canBuyPack } from "./pricing";
import { DAYS, TIMES, type DayId, type FieldErrors, type TimeId } from "./options";

export { DAYS, TIMES, type DayId, type FieldErrors, type TimeId };

const DAY_IDS = DAYS.map((d) => d.id) as [DayId, ...DayId[]];
const TIME_IDS = TIMES.map((t) => t.id) as [TimeId, ...TimeId[]];

export const bookingRequestSchema = z
  .object({
    audience: z.enum(AUDIENCE_IDS),
    format: z.enum(FORMAT_IDS),
    billing: z.enum(BILLINGS),
    name: z
      .string()
      .trim()
      .min(2, "Podaj imię i nazwisko.")
      .max(100, "Imię i nazwisko jest za długie."),
    email: z.string().trim().pipe(z.email("Podaj poprawny adres e-mail.").max(200)),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9][0-9 ()-]{7,18}[0-9]$/, "Podaj poprawny numer telefonu."),
    days: z.array(z.enum(DAY_IDS)).max(7).default([]),
    times: z.array(z.enum(TIME_IDS)).max(3).default([]),
    multisport: z.boolean().default(false),
    message: z.string().trim().max(1500, "Wiadomość może mieć maksymalnie 1500 znaków.").default(""),
    consent: z.literal(true, "Potrzebujemy zgody, żeby odpowiedzieć na zgłoszenie."),
  })
  .refine((data) => data.billing === "single" || canBuyPack(data.format), {
    path: ["billing"],
    message: "Pakiet 10 treningów jest dostępny tylko dla Duo i treningu indywidualnego.",
  });

export type BookingRequestInput = z.input<typeof bookingRequestSchema>;
export type BookingRequest = z.output<typeof bookingRequestSchema>;

/** Zamienia błędy zod na jeden komunikat na pole (pierwszy). */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = (issue.path[0] ?? "form") as keyof FieldErrors;
    errors[key] ??= issue.message;
  }
  return errors;
}
