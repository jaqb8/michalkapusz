/** Opcje formularza zgłoszenia, bez zależności: bezpieczne do importu w przeglądarce. */

export const DAYS = [
  { id: "mon", short: "Pn", name: "poniedziałek" },
  { id: "tue", short: "Wt", name: "wtorek" },
  { id: "wed", short: "Śr", name: "środa" },
  { id: "thu", short: "Cz", name: "czwartek" },
  { id: "fri", short: "Pt", name: "piątek" },
  { id: "sat", short: "Sb", name: "sobota" },
  { id: "sun", short: "Nd", name: "niedziela" },
] as const;

export const TIMES = [
  { id: "morning", name: "Rano", hint: "do 12:00" },
  { id: "afternoon", name: "Popołudnie", hint: "12–17" },
  { id: "evening", name: "Wieczór", hint: "po 17:00" },
] as const;

export type DayId = (typeof DAYS)[number]["id"];
export type TimeId = (typeof TIMES)[number]["id"];

export type FieldName =
  | "audience"
  | "format"
  | "billing"
  | "name"
  | "email"
  | "phone"
  | "days"
  | "times"
  | "multisport"
  | "message"
  | "consent";

/** Jeden komunikat na pole; "form" to błąd całego formularza. */
export type FieldErrors = Partial<Record<FieldName | "form", string>>;
