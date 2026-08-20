import type {
  Locale,
  Site,
  HomePage,
  Project,
  SkillCategory,
  AcademicEntry,
} from '../../types/domain'
import type { ContentRepository } from './repository'

function notImplemented(method: string): void {
  console.warn(
    `[sanityRepository] ${method} is not implemented yet. ` +
      `Sanity adapter is a boundary stub. Set CONTENT_SOURCE=local to use the local file-based repository.`
  )
}

export const sanityRepository: ContentRepository = {
  async getSite(_locale: Locale): Promise<Site> {
    notImplemented('getSite')
    return {
      brand: 'Daniel Ochoa',
      nav: [],
      socials: [],
    }
  },

  async getHome(_locale: Locale): Promise<HomePage> {
    notImplemented('getHome')
    return { sections: [] }
  },

  async getProjects(_locale: Locale): Promise<Project[]> {
    notImplemented('getProjects')
    return []
  },

  async getProjectBySlug(_slug: string, _locale: Locale): Promise<Project | null> {
    notImplemented('getProjectBySlug')
    return null
  },

  async getSkillCategories(_locale: Locale): Promise<SkillCategory[]> {
    notImplemented('getSkillCategories')
    return []
  },

  async getAcademic(_locale: Locale): Promise<AcademicEntry[]> {
    notImplemented('getAcademic')
    return []
  },
}
