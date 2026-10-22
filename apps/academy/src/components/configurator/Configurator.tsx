import { useRef, useState } from "react";
import {
  AUDIENCES,
  FORMATS,
  MULTISPORT_DISCOUNT,
  canBuyPack,
  getFormat,
  quote,
  type AudienceId,
  type Billing,
  type FormatId,
} from "@kapusz/booking";
import { BookingForm } from "./BookingForm";
import "./configurator.css";

// Rozstawienie zawodników na połowie kortu (% szerokości i wysokości podglądu).
const POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 84]],
  2: [
    [34, 84],
    [66, 84],
  ],
  3: [
    [28, 87],
    [50, 76],
    [72, 87],
  ],
  4: [
    [30, 74],
    [70, 74],
    [30, 90],
    [70, 90],
  ],
};

const GLYPHS: Record<number, string> = { 1: "●", 2: "●●", 3: "●●●", 4: "●●●●" };

interface Props {
  phone: string;
}

export default function Configurator({ phone }: Props) {
  const [audience, setAudience] = useState<AudienceId>("adult");
  const [format, setFormat] = useState<FormatId>("group4");
  const [billing, setBilling] = useState<Billing>("single");
  const [formOpen, setFormOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const q = quote({ audience, format, billing });
  const players = getFormat(format).players;
  const packAllowed = canBuyPack(format);
  const dots = [0, 1, 2, 3].map((i) => POSITIONS[players][i]);

  const pickFormat = (id: FormatId) => {
    setFormat(id);
    if (!canBuyPack(id)) setBilling("single");
  };

  const openForm = () => {
    setFormOpen(true);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      formRef.current?.querySelector<HTMLInputElement>("input[name='name']")?.focus({ preventScroll: true });
    });
  };

  return (
    <div className="cfg">
      <div className="cfg-panel">
        <div className="cfg-meta">
          <span>Podgląd kortu</span>
          <span>Trener 1 · Zawodnicy {players}</span>
        </div>
        <div className="cfg-court-wrap" aria-hidden="true">
          <div className="cfg-court">
            <svg viewBox="0 0 300 650" className="cfg-lines" fill="none" stroke="rgba(255,255,255,0.82)" strokeWidth="3">
              <rect x="1.5" y="1.5" width="297" height="647" />
              <line x1="37.5" y1="0" x2="37.5" y2="650" />
              <line x1="262.5" y1="0" x2="262.5" y2="650" />
              <line x1="37.5" y1="150" x2="262.5" y2="150" />
              <line x1="37.5" y1="500" x2="262.5" y2="500" />
              <line x1="150" y1="150" x2="150" y2="500" />
              <line x1="150" y1="0" x2="150" y2="12" />
              <line x1="150" y1="638" x2="150" y2="650" />
              <line x1="-16" y1="325" x2="316" y2="325" stroke="#ffffff" strokeWidth="5" />
            </svg>
            <span className="cfg-coach" />
            <span className="cfg-coach-pulse" />
            {dots.map((pos, i) => (
              <span
                key={i}
                className="cfg-dot"
                style={pos ? { left: `${pos[0]}%`, top: `${pos[1]}%`, opacity: 1 } : { left: "50%", top: "84%", opacity: 0 }}
              />
            ))}
          </div>
        </div>
        <div className="cfg-panel-foot">
          <div>
            <p className="cfg-title">{q.title}</p>
            <p className="cfg-desc">{q.description}</p>
          </div>
          <div className="cfg-legend" aria-hidden="true">
            <span>
              <i className="cfg-legend-coach" />
              Trener
            </span>
            <span>
              <i className="cfg-legend-player" />
              Zawodnicy
            </span>
          </div>
        </div>
      </div>

      <div className="cfg-side">
        <fieldset className="cfg-group">
          <legend className="cfg-legend-h">
            <span>Kto będzie trenować?</span>
            <span className="cfg-step">1 / 3</span>
          </legend>
          <div className="cfg-tiles cfg-tiles--3">
            {AUDIENCES.map((a) => (
              <button
                key={a.id}
                type="button"
                className="cfg-tile"
                aria-pressed={audience === a.id}
                onClick={() => setAudience(a.id)}
              >
                <span className="cfg-tile-name">{a.name}</span>
                <span className="cfg-tile-sub">{a.sub}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="cfg-group">
          <legend className="cfg-legend-h">
            <span>Format</span>
            <span className="cfg-step">2 / 3</span>
          </legend>
          <div className="cfg-tiles cfg-tiles--2">
            {FORMATS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="cfg-tile cfg-tile--row"
                aria-pressed={format === f.id}
                onClick={() => pickFormat(f.id)}
              >
                <span>
                  <span className="cfg-tile-name">{f.name}</span>
                  <span className="cfg-tile-sub">
                    {f.price} zł{f.players > 1 ? " / os." : ""}
                  </span>
                </span>
                <span className="cfg-glyph" aria-hidden="true">
                  {GLYPHS[f.players]}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="cfg-group">
          <legend className="cfg-legend-h">
            <span>Rozliczenie</span>
            <span className="cfg-step">3 / 3</span>
          </legend>
          <div className="cfg-tiles cfg-tiles--2">
            <button type="button" className="cfg-tile" aria-pressed={billing === "single"} onClick={() => setBilling("single")}>
              <span className="cfg-tile-name">Pojedynczy trening</span>
              <span className="cfg-tile-sub">płatność za trening</span>
            </button>
            <button
              type="button"
              className="cfg-tile"
              aria-pressed={billing === "pack10"}
              aria-disabled={!packAllowed}
              onClick={() => packAllowed && setBilling("pack10")}
            >
              <span className="cfg-tile-name">Pakiet 10 treningów</span>
              <span className="cfg-tile-sub">
                {packAllowed ? `oszczędzasz ${getFormat(format).pack?.saving} zł` : "dostępny dla Duo i 1:1"}
              </span>
            </button>
          </div>
        </fieldset>

        <div className="cfg-price">
          <p className="cfg-price-label">Twoja cena</p>
          <p className="cfg-price-row" aria-live="polite">
            <span className="cfg-price-num">{q.price}</span>
            <span className="cfg-price-unit">{q.unit}</span>
          </p>
          <p className="cfg-price-note">{q.note}</p>
          <div className="cfg-actions">
            <button type="button" className="k-pill k-pill--ink" onClick={openForm} aria-expanded={formOpen} aria-controls="zgloszenie">
              Zarezerwuj trening próbny
            </button>
            <a className="k-link cfg-call" href={`tel:${phone}`}>
              Zadzwoń <span className="k-chev">›</span>
            </a>
          </div>
          <p className="cfg-fine">
            Trening trwa 60 minut. Do ceny trenera doliczana jest odpowiednia część ceny kortu. Z kartą Multisport trening jest
            tańszy o {MULTISPORT_DISCOUNT} zł.
          </p>
        </div>

        <div id="zgloszenie" ref={formRef} className="cfg-form-wrap" hidden={!formOpen}>
          {formOpen && <BookingForm selection={{ audience, format, billing }} summary={q} />}
        </div>
      </div>
    </div>
  );
}
