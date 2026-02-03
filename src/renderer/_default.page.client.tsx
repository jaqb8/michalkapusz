import { hydrateRoot, createRoot } from "react-dom/client";
import { HelmetProvider } from "../lib/helmet";
import { BrowserRouter } from "react-router-dom";
import type { PageContextClient } from "vite-plugin-ssr/types";
import "../index.css";

export { render };
export const clientRouting = true;

let root: ReturnType<typeof createRoot> | ReturnType<typeof hydrateRoot>;

async function render(pageContext: PageContextClient) {
  const Page =
    pageContext.Page ??
    (pageContext as { exports?: { Page?: typeof pageContext.Page } }).exports
      ?.Page;
  const container = document.getElementById("root");

  if (!container) return;

  if (!Page) {
    throw new Error("No Page component found for client render.");
  }

  const page = (
    <HelmetProvider>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </HelmetProvider>
  );

  if (pageContext.isHydration) {
    root = hydrateRoot(container, page);
  } else if (root) {
    root.render(page);
  } else {
    root = createRoot(container);
    root.render(page);
  }
}
