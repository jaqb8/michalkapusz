import { Resend } from "resend";
import { bookingRequestSchema, toFieldErrors, type FieldErrors } from "./schema";
import { buildClientEmail, buildCoachEmail } from "./email";

/**
 * Obsługa zgłoszenia niezależna od frameworka: endpoint w Astro (albo przyszłe osobne API)
 * tylko przekazuje body i zamienia wynik na odpowiedź HTTP.
 */

export interface OutgoingEmail {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}

export interface Mailer {
  send(email: OutgoingEmail): Promise<void>;
}

export function createResendMailer(apiKey: string): Mailer {
  const resend = new Resend(apiKey);
  return {
    async send(email) {
      const { error } = await resend.emails.send({
        from: email.from,
        to: email.to,
        replyTo: email.replyTo,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });
      if (error) throw new Error(`Resend: ${error.name}: ${error.message}`);
    },
  };
}

/** Do pracy lokalnej bez klucza API: wypisuje maile w konsoli zamiast je wysyłać. */
export function createConsoleMailer(log: (message: string) => void = console.info): Mailer {
  return {
    async send(email) {
      log(`[booking] mail do ${email.to}: ${email.subject}\n${email.text}`);
    },
  };
}

export interface BookingConfig {
  mailer: Mailer;
  /** Nadawca, np. "Kapusz Tennis Academy <rezerwacje@twojadomena.pl>" (domena zweryfikowana w Resend). */
  from: string;
  /** Skrzynka trenera, na którą trafiają zgłoszenia. */
  coachTo: string;
  now?: () => number;
  onError?: (error: unknown) => void;
}

export type BookingResult =
  | { ok: true }
  | { ok: false; status: 400 | 500; errors: FieldErrors };

/** Formularz wypełniony szybciej niż w tym czasie traktujemy jak bota. */
export const MIN_FILL_MS = 2500;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Pułapki na boty: ukryte pole "website" i zbyt szybkie wysłanie. */
function looksLikeBot(body: Record<string, unknown>, now: number) {
  if (typeof body.website === "string" && body.website.trim() !== "") return true;
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : undefined;
  return startedAt !== undefined && now - startedAt < MIN_FILL_MS;
}

export async function handleBookingSubmission(body: unknown, config: BookingConfig): Promise<BookingResult> {
  if (!isRecord(body)) {
    return { ok: false, status: 400, errors: { form: "Nieprawidłowe dane formularza." } };
  }

  const now = config.now?.() ?? Date.now();
  // Botom odpowiadamy sukcesem, żeby nie uczyły się omijać pułapki.
  if (looksLikeBot(body, now)) return { ok: true };

  const parsed = bookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return { ok: false, status: 400, errors: toFieldErrors(parsed.error) };
  }

  const request = parsed.data;
  const coachEmail = buildCoachEmail(request);

  try {
    await config.mailer.send({ ...coachEmail, from: config.from, to: config.coachTo, replyTo: request.email });
  } catch (error) {
    config.onError?.(error);
    return {
      ok: false,
      status: 500,
      errors: { form: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie albo zadzwoń do nas." },
    };
  }

  // Zgłoszenie już dotarło do trenera; brak potwierdzenia dla klienta nie jest błędem formularza.
  try {
    await config.mailer.send({ ...buildClientEmail(request), from: config.from, to: request.email, replyTo: config.coachTo });
  } catch (error) {
    config.onError?.(error);
  }

  return { ok: true };
}
