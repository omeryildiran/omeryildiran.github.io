import { defineCollection, z } from "astro:content";

const notes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { notes };

