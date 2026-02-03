import { blogPosts } from "../content/blog/posts";

export { prerender };

async function prerender() {
  const staticRoutes = ["/", "/cennik", "/blog"];
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  return [...staticRoutes, ...blogRoutes];
}
