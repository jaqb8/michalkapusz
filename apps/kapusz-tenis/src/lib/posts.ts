import { getCollection } from "astro:content";

/** Wpisy bloga od najnowszego. */
export async function getPosts() {
  const posts = await getCollection("blog");
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
