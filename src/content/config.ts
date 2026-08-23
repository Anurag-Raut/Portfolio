import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    readingTime: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  tech: z.array(z.string()),
  repository: z.string().url(),
  repositoryLabel: z.enum(['Repository', 'GitHub profile']).default('Repository'),
  writeupSlug: z.string().optional(),
  order: z.number().int(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  showOnHome: z.boolean().default(true),
  image: z.string().regex(/^\/[^/].*/, 'Image must be a site-relative public path').optional(),
  imageAlt: z.string().min(1).optional(),
}).superRefine((project, context) => {
  if (project.image && !project.imageAlt) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['imageAlt'], message: 'Image alt text is required when an image is set' });
  }
});

const projects = defineCollection({
  type: 'content',
  schema: projectSchema,
});

export const collections = { blog, projects };
