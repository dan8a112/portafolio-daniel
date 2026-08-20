export type Locale = 'es' | 'en'

export interface LocalizedText {
  es: string
  en: string
}

export interface Site {
  brand: string
  nav: { label: string; href: string }[]
  socials: { icon: string; url: string; altText: string }[]
}

export interface HomePage {
  sections: Section[]
}

export type Section =
  | {
      type: 'hero'
      greeting: string
      label: string
      name: string
      role: string
      tagline: string
      primaryCta: { label: string; href: string }
      secondaryCta: { label: string; href?: string }
      paragraph: string
      image: string
      imageAlt: string
    }
  | { type: 'content'; blocks: ContentBlock[] }
  | { type: 'linkCards'; title: string; links: { label: string; href: string }[] }
  | { type: 'featuredProjects'; title: string; projectSlugs: string[] }
  | { type: 'highlights'; items: { label: string; value: string; icon?: string }[] }
  | { type: 'experience'; title: string }

export interface ContentBlock {
  title: string
  paragraph: string
  image: string
  imageAlt: string
  imageRight: boolean
}

export interface Project {
  slug: string
  title: string
  description: string
  body: string
  image: string
  skills: string[]
  featured: boolean
  order: number
  publishedAt?: Date
}

export interface SkillCategory {
  id: string
  title: string
  icon?: string
  items: SkillItem[]
}

export interface SkillItem {
  text: string
  percentage: number
  endText: string
  icon?: string
}

export interface AcademicEntry {
  kind: 'education' | 'certification' | 'course'
  image: string
  title: string
  subtitle: string
  period: string
  href?: string
  order: number
}

export interface Experience {
  id: string
  year: string
  role: string
  company: string
  period: string
  description: string
  order: number
}
