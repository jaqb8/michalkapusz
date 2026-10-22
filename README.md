# Kapusz — monorepo

Dwie strony jednej marki, wspólna identyfikacja (kierunek D z canvasa „Kapusz Tennis Academy”).

```
apps/
  kapusz-tenis/   kapusz-tenis.pl — strona trenera i blog (Astro, statyczna)
  academy/        Kapusz Tennis Academy — strona akademii z konfiguratorem (Astro + funkcja Netlify)
packages/
  brand/          tokeny CSS, fonty (self-hosted), style bazowe, logo, dane kontaktowe
  ui/             wspólne komponenty Astro: nawigacja, stopka, statystyki, opinie, ujawnianie przy przewijaniu
  booking/        logika zgłoszeń bez frameworka: cennik, walidacja (zod), treść maili, wysyłka (Resend)
```

## Komendy

Wymagany Node 22 (`.nvmrc`). Wszystko uruchamiasz z katalogu głównego:

| Komenda | Co robi |
| --- | --- |
| `npm install` | instaluje zależności wszystkich pakietów |
| `npm run dev:tenis` | dev server kapusz-tenis.pl |
| `npm run dev:academy` | dev server akademii |
| `npm run build` | build obu stron |
| `npm run check` | sprawdzanie typów (Astro + TypeScript) |
| `npm test` | testy (`packages/booking`) |

## Gdzie co zmieniać

- **Kolory, typografia, promienie** — `packages/brand/src/tokens.css`. Zmiana działa na obu stronach.
- **Ceny** — `packages/booking/src/pricing.ts`. Z tego pliku korzystają konfigurator akademii, `/cennik` i maile.
- **Opinie klientów** — `packages/ui/src/testimonials.ts`.
- **Telefon, e-mail, adres, social media** — `packages/brand/src/contact.ts`.
- **Wpisy bloga** — `apps/kapusz-tenis/src/content/blog/*.mdx`. Nazwa pliku to adres wpisu. Zdjęcia trafiają do `apps/kapusz-tenis/public/`, a galerię i sponsorów wstawiasz w treści przez `<Gallery images={frontmatter.gallery} />` i `<Sponsors items={frontmatter.sponsors} />`.
- **Trenerzy akademii** — `apps/academy/src/data/team.ts`.

## Formularz zgłoszeń (akademia)

`POST /api/booking` → `handleBookingSubmission` z `@kapusz/booking/server`, który:

1. odrzuca boty (ukryte pole i zbyt szybkie wysłanie formularza),
2. waliduje dane schematem zod i oblicza cenę po stronie serwera,
3. wysyła przez Resend zgłoszenie do trenera (reply-to: klient) i potwierdzenie do klienta.

Zmienne środowiskowe (Netlify → Site configuration → Environment variables; lokalnie `apps/academy/.env`, wzór w `.env.example`):

| Zmienna | Opis |
| --- | --- |
| `RESEND_API_KEY` | klucz API Resend. Lokalnie bez klucza maile są tylko wypisywane w konsoli |
| `BOOKING_FROM` | nadawca w domenie zweryfikowanej w Resend |
| `BOOKING_TO` | skrzynka trenera (domyślnie kapusztenis@gmail.com) |
| `SITE_URL` | publiczny adres akademii |

Logika nie zależy od Astro, więc przy rozbudowie backendu (baza zgłoszeń, płatności, panel) można ją przenieść do osobnej aplikacji `apps/api` bez przepisywania.

## Deploy (Netlify)

Każda strona to osobny site Netlify podpięty do tego samego repo:

| Site | Base directory | Package directory | Konfiguracja |
| --- | --- | --- | --- |
| kapusz-tenis.pl | `/` | `apps/kapusz-tenis` | `apps/kapusz-tenis/netlify.toml` |
| akademia | `/` | `apps/academy` | `apps/academy/netlify.toml` |

Deploy jest pomijany, gdy commit nie dotyka danej aplikacji ani `packages/` (`ignore` w `netlify.toml`).

## Migracja z poprzedniej wersji

- Stara aplikacja Vite + `vite-plugin-ssr` leży w `apps/kapusz-tenis/legacy-vite/` tylko do wglądu. Nie jest budowana i można ją usunąć.
- Adresy URL, tytuły, opisy, canonicale, dane strukturalne i `sitemap.xml` zostały zachowane 1:1.
- Poprzednia wersja instalowała service workera (PWA). `public/sw.js` i `public/registerSW.js` wyrejestrowują go i czyszczą cache u powracających odwiedzających. Zostaw je na kilka miesięcy.
