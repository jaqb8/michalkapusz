import { addressLine, contact } from "@kapusz/brand/contact";
import { DAYS, TIMES, type BookingRequest } from "./schema";
import { MULTISPORT_DISCOUNT, getAudience, quote } from "./pricing";

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

const BRAND = "Kapusz Tennis Academy";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function listOrDash(values: string[]) {
  return values.length > 0 ? values.join(", ") : "bez preferencji";
}

/** Wiersze podsumowania zgłoszenia, wspólne dla obu maili. */
function summaryRows(request: BookingRequest): [string, string][] {
  const q = quote(request);
  const days = DAYS.filter((d) => request.days.includes(d.id)).map((d) => d.name);
  const times = TIMES.filter((t) => request.times.includes(t.id)).map((t) => `${t.name.toLowerCase()} (${t.hint})`);

  return [
    ["Kto trenuje", `${getAudience(request.audience).name} · ${q.title}`],
    ["Wybrany trening", q.summary],
    ["Cena", `${q.price} ${q.unit}${request.multisport ? ` · Multisport: −${MULTISPORT_DISCOUNT} zł za trening` : ""}`],
    ["Preferowane dni", listOrDash(days)],
    ["Preferowana pora", listOrDash(times)],
  ];
}

function layout(title: string, intro: string, rows: [string, string][], footer: string) {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e8e8ed;color:#6e6e73;font-size:14px;vertical-align:top;width:38%">${escapeHtml(label)}</td>
          <td style="padding:12px 0;border-bottom:1px solid #e8e8ed;color:#1d1d1f;font-size:14px;font-weight:600;white-space:pre-line">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="pl">
  <body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:32px 12px">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:24px;padding:36px 32px">
            <tr><td style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.08em;color:#6e6e73;text-transform:uppercase">${BRAND}</td></tr>
            <tr><td style="padding-top:14px;font-size:26px;line-height:1.15;font-weight:600;letter-spacing:-.02em;color:#1d1d1f">${escapeHtml(title)}</td></tr>
            <tr><td style="padding-top:12px;font-size:15px;line-height:1.5;color:#6e6e73">${intro}</td></tr>
            <tr><td style="padding-top:20px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #d2d2d7">${rowsHtml}</table></td></tr>
            <tr><td style="padding-top:24px;font-size:13px;line-height:1.5;color:#6e6e73">${footer}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function toText(title: string, intro: string, rows: [string, string][], footer: string) {
  return [title, "", intro, "", ...rows.map(([label, value]) => `${label}: ${value}`), "", footer].join("\n");
}

/** Mail do trenera: pełne dane zgłoszenia, odpowiedź trafia do klienta (reply-to). */
export function buildCoachEmail(request: BookingRequest): EmailContent {
  const q = quote(request);
  const title = `Nowe zgłoszenie: ${request.name}`;
  const rows: [string, string][] = [
    ["Imię i nazwisko", request.name],
    ["Telefon", request.phone],
    ["E-mail", request.email],
    ...summaryRows(request),
    ...(request.message ? ([["Wiadomość", request.message]] as [string, string][]) : []),
  ];
  const intro = "Ktoś chce umówić trening próbny. Odpowiedz na tego maila, żeby napisać bezpośrednio do zgłaszającego.";
  const footer = "Zgłoszenie wysłane z konfiguratora na stronie akademii.";

  return {
    subject: `Trening próbny: ${q.title} — ${request.name}`,
    html: layout(title, escapeHtml(intro), rows, escapeHtml(footer)),
    text: toText(title, intro, rows, footer),
  };
}

/** Potwierdzenie dla zgłaszającego. */
export function buildClientEmail(request: BookingRequest): EmailContent {
  const firstName = request.name.split(/\s+/)[0] ?? request.name;
  const title = `Dziękujemy, ${firstName}!`;
  const intro =
    "Dostaliśmy Twoje zgłoszenie na trening próbny. Odezwiemy się telefonicznie lub mailowo, żeby ustalić termin i dobrać trenera.";
  const footer = `Masz pytania? Zadzwoń: ${contact.phoneDisplay} lub odpisz na tego maila. ${BRAND}, ${addressLine}.`;
  const rows = summaryRows(request);

  return {
    subject: `Otrzymaliśmy Twoje zgłoszenie — ${BRAND}`,
    html: layout(title, escapeHtml(intro), rows, escapeHtml(footer)),
    text: toText(title, intro, rows, footer),
  };
}
