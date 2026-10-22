import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const imageRef = z.object({ src: z.string(), alt: z.string() });

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default("Michał Kapusz"),
    /** Miniatura na liście i w udostępnieniach (ścieżka w public/). */
    image: z.string().optional(),
    /** Opcjonalne inne zdjęcie nad treścią wpisu. */
    featuredImage: z.string().optional(),
    imagePosition: z.string().optional(),
    gallery: z.array(imageRef).optional(),
    sponsors: z.array(imageRef).optional(),
  }),
});

export const collections = { blog };
