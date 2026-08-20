import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const localizedText = z.object({
  es: z.string(),
  en: z.string(),
})

const contentBlockSchema = z.object({
  title: localizedText,
  paragraph: localizedText,
  image: z.string(),
  imageAlt: localizedText,
  imageRight: z.boolean().default(false),
})

const sectionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('hero'),
    greeting: localizedText,
    label: localizedText,
    name: z.string(),
    role: localizedText,
    tagline: localizedText,
    primaryCta: z.object({
      label: localizedText,
      href: z.string(),
    }),
    secondaryCta: z.object({
      label: localizedText,
      href: z.string().optional(),
    }),
    paragraph: localizedText,
    image: z.string(),
    imageAlt: localizedText,
  }),
  z.object({
    type: z.literal('content'),
    blocks: z.array(contentBlockSchema),
  }),
  z.object({
    type: z.literal('linkCards'),
    title: localizedText,
    links: z.array(
      z.object({
        label: localizedText,
        href: z.string(),
      })
    ),
  }),
  z.object({
    type: z.literal('featuredProjects'),
    title: localizedText,
    projectSlugs: z.array(z.string()),
  }),
  z.object({
    type: z.literal('highlights'),
    items: z.array(
      z.object({
        label: localizedText,
        value: localizedText,
        icon: z.string().optional(),
      })
    ),
  }),
  z.object({
    type: z.literal('experience'),
    title: localizedText,
  }),
  z.object({
    type: z.literal('skills'),
    title: localizedText,
  }),
  z.object({
    type: z.literal('education'),
    title: localizedText,
    educationTitle: localizedText,
    certificatesTitle: localizedText,
  }),
  z.object({
    type: z.literal('about'),
    title: localizedText,
    paragraphs: z.array(localizedText),
    cta: z.object({
      label: localizedText,
      href: z.string(),
    }),
    image: z.string(),
    imageAlt: localizedText,
  }),
  z.object({
    type: z.literal('contact'),
    title: localizedText,
    paragraphs: z.array(localizedText),
  }),
])

const site = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content/site' }),
  schema: z.object({
    brand: z.string(),
    nav: z.array(
      z.object({
        label: localizedText,
        href: z.string(),
      })
    ),
    socials: z.array(
      z.object({
        icon: z.string(),
        url: z.string(),
        altText: localizedText,
      })
    ),
  }),
})

const home = defineCollection({
  loader: glob({ pattern: 'home.json', base: './src/content/home' }),
  schema: z.object({
    sections: z.array(sectionSchema),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    image: z.string(),
    skills: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    publishedAt: z.coerce.date().optional(),
  }),
})

const skillCategory = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/skills' }),
  schema: z.object({
    id: z.string(),
    title: localizedText,
    description: localizedText,
    icon: z.string().optional(),
    order: z.number(),
    items: z.array(
      z.object({
        text: localizedText,
      })
    ),
  }),
})

const academic = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/academic' }),
  schema: z.object({
    kind: z.enum(['education', 'certification', 'course']),
    image: z.string(),
    title: localizedText,
    subtitle: localizedText,
    period: localizedText,
    href: z.string().optional(),
    order: z.number(),
  }),
})

const experience = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/experience' }),
  schema: z.object({
    id: z.string(),
    year: z.string(),
    role: localizedText,
    company: localizedText,
    period: localizedText,
    description: localizedText,
    order: z.number(),
  }),
})

export const collections = {
  site,
  home,
  projects,
  skillCategory,
  academic,
  experience,
}
