import { useRef, useState } from "react";
import { DAYS, TIMES, type AudienceId, type Billing, type FieldErrors, type FormatId, type Quote } from "@kapusz/booking";

interface Props {
  selection: { audience: AudienceId; format: FormatId; billing: Billing };
  summary: Quote;
}

type Status = "idle" | "sending" | "sent";

const FIELD_ORDER = ["name", "email", "phone", "consent", "form"] as const;

export function BookingForm({ selection, summary }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      ...selection,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      days: data.getAll("days").map(String),
      times: data.getAll("times").map(String),
      multisport: data.get("multisport") === "on",
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
      startedAt: startedAt.current,
    };

    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { errors?: FieldErrors };
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const next = body.errors ?? { form: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie." };
      setErrors(next);
      setStatus("idle");
      const first = FIELD_ORDER.find((key) => next[key]);
      if (first && first !== "form") formRef.current?.querySelector<HTMLElement>(`[name='${first}']`)?.focus();
    } catch {
      setErrors({ form: "Brak połączenia. Sprawdź internet i spróbuj ponownie." });
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="bf bf-done" role="status">
        <p className="cfg-price-label">Zgłoszenie wysłane</p>
        <p className="bf-done-h">Dziękujemy! Odezwiemy się wkrótce.</p>
        <p className="bf-done-p">
          Potwierdzenie wysłaliśmy na Twój adres e-mail. Zadzwonimy albo odpiszemy, żeby ustalić termin i dobrać trenera.
        </p>
      </div>
    );
  }

  const err = (key: keyof FieldErrors) =>
    errors[key] ? (
      <span id={`bf-${key}-err`} className="bf-err">
        {errors[key]}
      </span>
    ) : null;
  const a11y = (key: keyof FieldErrors) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `bf-${key}-err` : undefined,
  });

  return (
    <form ref={formRef} className="bf" onSubmit={onSubmit} noValidate>
      <div>
        <p className="cfg-price-label">Trening próbny</p>
        <p className="bf-h">Zostaw kontakt.</p>
        <p className="bf-sub">{summary.summary}</p>
      </div>

      <div className="bf-grid">
        <label className="bf-field bf-field--wide">
          <span className="bf-label">Imię i nazwisko</span>
          <input name="name" autoComplete="name" required maxLength={100} {...a11y("name")} />
          {err("name")}
        </label>
        <label className="bf-field">
          <span className="bf-label">E-mail</span>
          <input name="email" type="email" autoComplete="email" inputMode="email" required maxLength={200} {...a11y("email")} />
          {err("email")}
        </label>
        <label className="bf-field">
          <span className="bf-label">Telefon</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={20} {...a11y("phone")} />
          {err("phone")}
        </label>
      </div>

      <fieldset className="bf-chips-group">
        <legend className="bf-label">Preferowane dni</legend>
        <div className="bf-chips">
          {DAYS.map((d) => (
            <label key={d.id} className="bf-chip">
              <input type="checkbox" name="days" value={d.id} />
              <span title={d.name}>{d.short}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="bf-chips-group">
        <legend className="bf-label">Pora dnia</legend>
        <div className="bf-chips">
          {TIMES.map((t) => (
            <label key={t.id} className="bf-chip bf-chip--wide">
              <input type="checkbox" name="times" value={t.id} />
              <span>
                {t.name} <small>{t.hint}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="bf-field">
        <span className="bf-label">Wiadomość (opcjonalnie)</span>
        <textarea name="message" rows={3} maxLength={1500} placeholder="Np. wiek dziecka, dotychczasowe doświadczenie, cel" />
      </label>

      <label className="bf-check">
        <input type="checkbox" name="multisport" />
        <span>Mam kartę Multisport</span>
      </label>

      <label className="bf-check">
        <input type="checkbox" name="consent" required {...a11y("consent")} />
        <span>
          Zgadzam się na przetwarzanie podanych danych w celu odpowiedzi na zgłoszenie.{" "}
          <a href="/polityka-prywatnosci/" target="_blank" rel="noopener">
            Polityka prywatności
          </a>
        </span>
      </label>
      {err("consent")}

      {/* Pułapka na boty: niewidoczna dla ludzi i czytników ekranu. */}
      <div className="bf-hp" aria-hidden="true">
        <label>
          Strona www
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {errors.form && (
        <p className="bf-err bf-err--form" role="alert">
          {errors.form}
        </p>
      )}

      <div>
        <button type="submit" className="k-pill k-pill--ink" disabled={status === "sending"}>
          {status === "sending" ? "Wysyłanie…" : "Wyślij zgłoszenie"}
        </button>
      </div>
    </form>
  );
}
