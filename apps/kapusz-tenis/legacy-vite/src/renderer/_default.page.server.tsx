import type { ComponentType } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "../lib/helmet";
import { StaticRouter } from "react-router-dom/server";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import type { PageContextServer } from "vite-plugin-ssr/types";
import type { HelmetServerState } from "react-helmet-async";
import "../index.css";

export { render };

async function render(pageContext: PageContextServer) {
  const Page =
    (pageContext.Page as ComponentType | undefined) ??
    ((pageContext as { exports?: { Page?: ComponentType } }).exports?.Page as
      | ComponentType
      | undefined);
  const helmetContext: { helmet?: HelmetServerState } = {};

  if (!Page) {
    throw new Error("No Page component found for SSR render.");
  }

  const pageHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={pageContext.urlOriginal}>
        <Page />
      </StaticRouter>
    </HelmetProvider>,
  );

  const helmet = helmetContext.helmet;

  return escapeInject`<!DOCTYPE html>
    <html lang="pl">
      <head>
        ${dangerouslySkipEscape(helmet?.title?.toString() ?? "")}
        ${dangerouslySkipEscape(helmet?.meta?.toString() ?? "")}
        ${dangerouslySkipEscape(helmet?.link?.toString() ?? "")}
        ${dangerouslySkipEscape(helmet?.script?.toString() ?? "")}
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}
