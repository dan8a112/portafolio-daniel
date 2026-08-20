import { getCollection } from 'astro:content'
import type {
  Locale,
  LocalizedText,
  Site,
  HomePage,
  Section,
  Project,
  SkillCategory,
  AcademicEntry,
} from '../../types/domain'
import type { ContentRepository } from './repository'

function t(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.es
}

async function loadSite(locale: Locale): Promise<Site> {
  const entries = await getCollection('site')
  const entry = entries[0]
  if (!entry) {
    return { brand: 'Daniel Ochoa', nav: [], socials: [] }
  }
  return {
    brand: entry.data.brand,
    nav: entry.data.nav.map((item) => ({
      label: item.label[locale],
      href: item.href,
    })),
    socials: entry.data.socials.map((item) => ({
      icon: item.icon,
      url: item.url,
      altText: item.altText[locale],
    })),
  }
}

async function loadHome(locale: Locale): Promise<HomePage> {
  const entries = await getCollection('home')
  const entry = entries[0]
  if (!entry) {
    return { sections: [] }
  }

  const sections: Section[] = entry.data.sections.map((section: any) => {
    switch (section.type) {
      case 'hero':
        return {
          type: 'hero',
          greeting: t(section.greeting, locale),
          label: t(section.label, locale),
          name: section.name,
          role: t(section.role, locale),
          tagline: t(section.tagline, locale),
          primaryCta: {
            label: t(section.primaryCta.label, locale),
            href: section.primaryCta.href,
          },
          secondaryCta: {
            label: t(section.secondaryCta.label, locale),
            href: section.secondaryCta.href,
          },
          paragraph: t(section.paragraph, locale),
          image: section.image,
          imageAlt: t(section.imageAlt, locale),
        }
      case 'content':
        return {
          type: 'content',
          blocks: section.blocks.map((block: any) => ({
            title: t(block.title, locale),
            paragraph: t(block.paragraph, locale),
            image: block.image,
            imageAlt: t(block.imageAlt, locale),
            imageRight: block.imageRight,
          })),
        }
      case 'linkCards':
        return {
          type: 'linkCards',
          title: t(section.title, locale),
          links: section.links.map((link: any) => ({
            label: t(link.label, locale),
            href: link.href,
          })),
        }
      case 'featuredProjects':
        return {
          type: 'featuredProjects',
          title: t(section.title, locale),
          projectSlugs: section.projectSlugs,
        }
      default:
        return section as Section
    }
  })

  return { sections }
}

function getSlugFromProjectId(id: string): { locale: string; slug: string } {
  const [locale, ...rest] = id.split('/')
  return { locale, slug: rest.join('/') }
}

async function loadProjects(locale: Locale): Promise<Project[]> {
  const entries = await getCollection('projects')
  return entries
    .filter((entry) => entry.id.startsWith(`${locale}/`))
    .map((entry) => {
      const { slug } = getSlugFromProjectId(entry.id)
      return {
        slug,
        title: entry.data.title,
        description: entry.data.description,
        body: '',
        image: entry.data.image,
        skills: entry.data.skills,
        featured: entry.data.featured,
        order: entry.data.order,
        publishedAt: entry.data.publishedAt,
      }
    })
}

async function loadSkillCategories(locale: Locale): Promise<SkillCategory[]> {
  const entries = await getCollection('skillCategory')
  return entries.map((entry) => ({
    id: entry.data.id,
    title: entry.data.title[locale],
    icon: entry.data.icon,
    items: entry.data.items.map((item) => ({
      text: item.text[locale],
      percentage: item.percentage,
      endText: item.endText,
      icon: item.icon,
    })),
  }))
}

async function loadAcademic(locale: Locale): Promise<AcademicEntry[]> {
  const entries = await getCollection('academic')
  return entries.map((entry) => ({
    kind: entry.data.kind,
    image: entry.data.image,
    title: entry.data.title[locale],
    subtitle: entry.data.subtitle[locale],
    period: entry.data.period[locale],
    href: entry.data.href,
    order: entry.data.order,
  }))
}

export const localRepository: ContentRepository = {
  async getSite(locale) {
    return loadSite(locale)
  },

  async getHome(locale) {
    return loadHome(locale)
  },

  async getProjects(locale) {
    return loadProjects(locale)
  },

  async getProjectBySlug(slug, locale) {
    const projects = await loadProjects(locale)
    const project = projects.find((project) => project.slug === slug)
    return project ?? null
  },

  async getSkillCategories(locale) {
    return loadSkillCategories(locale)
  },

  async getAcademic(locale) {
    return loadAcademic(locale)
  },
}
