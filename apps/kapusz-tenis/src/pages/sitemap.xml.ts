import type { APIRoute } from "astro";
import { getPosts } from "../lib/posts";
import { SITE } from "../lib/schema";

// Ten sam adres i format co wcześniej (zgłoszony w Google Search Console), ale generowany z wpisów.
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const day = (date: Date) => date.toISOString().slice(0, 10);
  const newest = posts[0] ? day(posts[0].data.date) : undefined;

  const urls = [
    { loc: "/", lastmod: newest, changefreq: "weekly", priority: "1.0" },
    { loc: "/cennik/", changefreq: "monthly", priority: "0.8" },
    { loc: "/blog/", lastmod: newest, changefreq: "weekly", priority: "0.9" },
    ...posts.map((post) => ({
      loc: `/blog/${post.id}/`,
      lastmod: day(post.data.date),
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${SITE}${url.loc}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ""}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
