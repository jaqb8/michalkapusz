// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

// Strona w pełni statyczna: bez adaptera, wynik w dist/ trafia prosto na Netlify.
export default defineConfig({
  site: "https://kapusz-tenis.pl",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  integrations: [react(), mdx()],
});
