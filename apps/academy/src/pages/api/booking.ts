import type { APIRoute } from "astro";
import { BOOKING_FROM, BOOKING_TO, RESEND_API_KEY } from "astro:env/server";
import { createConsoleMailer, createResendMailer, handleBookingSubmission } from "@kapusz/booking/server";

// Jedyna trasa działająca na żądanie (funkcja Netlify); reszta strony jest statyczna.
export const prerender = false;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const POST: APIRoute = async ({ request }) => {
  if (!RESEND_API_KEY && !import.meta.env.DEV) {
    console.error("[booking] Brak RESEND_API_KEY — zgłoszenie nie może zostać wysłane.");
    return json({ errors: { form: "Formularz jest chwilowo niedostępny. Zadzwoń do nas." } }, 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ errors: { form: "Nieprawidłowe dane formularza." } }, 400);
  }

  const result = await handleBookingSubmission(body, {
    mailer: RESEND_API_KEY ? createResendMailer(RESEND_API_KEY) : createConsoleMailer(),
    from: BOOKING_FROM,
    coachTo: BOOKING_TO,
    onError: (error) => console.error("[booking]", error),
  });

  return result.ok ? json({ ok: true }, 200) : json({ errors: result.errors }, result.status);
};
