// @ts-check
import { defineConfig, envField } from "astro/config";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";

export default defineConfig({
  // TODO: docelowa domena akademii; na Netlify ustaw zmienną SITE_URL.
  site: process.env.SITE_URL ?? "https://akademia.kapusz-tenis.pl",
  trailingSlash: "ignore",
  // Strony są statyczne; tylko /api/booking działa na żądanie (funkcja Netlify).
  output: "static",
  // Obrazy optymalizowane przy buildzie (sharp), bez Netlify Image CDN: działa tak samo lokalnie i na produkcji.
  adapter: netlify({ imageCDN: false }),
  integrations: [react()],
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      BOOKING_FROM: envField.string({
        context: "server",
        access: "secret",
        default: "Kapusz Tennis Academy <onboarding@resend.dev>",
      }),
      BOOKING_TO: envField.string({ context: "server", access: "secret", default: "kapusztenis@gmail.com" }),
    },
  },
});
