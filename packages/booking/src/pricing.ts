/**
 * Cennik treningów: jedno źródło dla konfiguratora akademii, strony /cennik i treści maili.
 * Ceny w złotych, trening trwa 60 minut, cena kortu doliczana osobno.
 */

export const SESSION_MINUTES = 60;
export const MULTISPORT_DISCOUNT = 15;
export const PACK_SIZE = 10;

export const AUDIENCES = [
  {
    id: "child",
    name: "Dziecko",
    sub: "4–9 lat",
    program: "Mini tenis",
    description: "Koordynacja, zabawa i pierwsze odbicia na mniejszym korcie.",
  },
  {
    id: "junior",
    name: "Junior",
    sub: "10–18 lat",
    program: "Junior",
    description: "Technika, taktyka i przygotowanie do startów w turniejach.",
  },
  {
    id: "adult",
    name: "Dorosły",
    sub: "18+",
    program: "Dorośli",
    description: "Od pierwszego odbicia po grę meczową, w Twoim tempie.",
  },
] as const;

export type AudienceId = (typeof AUDIENCES)[number]["id"];

export interface Pack {
  /** Cena pakietu za osobę. */
  price: number;
  /** Cena jednego treningu w pakiecie. */
  perSession: number;
  /** Oszczędność względem 10 pojedynczych treningów. */
  saving: number;
}

export interface Format {
  id: string;
  name: string;
  longName: string;
  players: 1 | 2 | 3 | 4;
  /** Cena za osobę za jeden trening. */
  price: number;
  court: string;
  pack?: Pack;
}

export const FORMATS = [
  {
    id: "group4",
    name: "Grupa 4 os.",
    longName: "Trening grupowy (4 osoby)",
    players: 4,
    price: 50,
    court: "¼ ceny kortu",
  },
  {
    id: "group3",
    name: "Grupa 3 os.",
    longName: "Trening 3-osobowy",
    players: 3,
    price: 60,
    court: "⅓ ceny kortu",
  },
  {
    id: "duo",
    name: "Duo",
    longName: "Trening dwuosobowy",
    players: 2,
    price: 75,
    court: "½ ceny kortu",
    pack: { price: 700, perSession: 70, saving: 50 },
  },
  {
    id: "individual",
    name: "Indywidualnie",
    longName: "Trening indywidualny",
    players: 1,
    price: 120,
    court: "pełna cena kortu",
    pack: { price: 1100, perSession: 110, saving: 100 },
  },
] as const satisfies readonly Format[];

export type FormatId = (typeof FORMATS)[number]["id"];

export const BILLINGS = ["single", "pack10"] as const;
export type Billing = (typeof BILLINGS)[number];

export const AUDIENCE_IDS = AUDIENCES.map((a) => a.id) as [AudienceId, ...AudienceId[]];
export const FORMAT_IDS = FORMATS.map((f) => f.id) as [FormatId, ...FormatId[]];

export function getAudience(id: AudienceId) {
  const audience = AUDIENCES.find((a) => a.id === id);
  if (!audience) throw new Error(`Unknown audience: ${id}`);
  return audience;
}

export function getFormat(id: FormatId): Format {
  const format = FORMATS.find((f) => f.id === id);
  if (!format) throw new Error(`Unknown format: ${id}`);
  return format;
}

export function canBuyPack(formatId: FormatId) {
  return getFormat(formatId).pack !== undefined;
}

export interface Quote {
  title: string;
  description: string;
  /** Kwota do wyświetlenia (za trening albo za pakiet). */
  price: number;
  unit: string;
  note: string;
  players: number;
  billing: Billing;
  /** Jedna linia do maila, np. "Duo · pakiet 10 treningów · 700 zł / os.". */
  summary: string;
}

export function quote(input: { audience: AudienceId; format: FormatId; billing: Billing }): Quote {
  const audience = getAudience(input.audience);
  const format = getFormat(input.format);
  const pack = input.billing === "pack10" ? format.pack : undefined;
  const single = format.players === 1;
  const perPerson = single ? "" : " / os.";

  const price = pack ? pack.price : format.price;
  const unit = pack
    ? `zł${perPerson} · pakiet ${PACK_SIZE} treningów`
    : `zł${perPerson} za trening`;
  const note =
    (pack ? `${pack.perSession} zł za trening · oszczędzasz ${pack.saving} zł · ` : "") + `+ ${format.court}`;

  return {
    title: `${audience.program} · ${format.name}`,
    description: audience.description,
    price,
    unit,
    note,
    players: format.players,
    billing: pack ? "pack10" : "single",
    summary: `${format.longName} · ${pack ? `pakiet ${PACK_SIZE} treningów` : "pojedynczy trening"} · ${price} zł${perPerson} + ${format.court}`,
  };
}
