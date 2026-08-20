import type {
  Locale,
  Site,
  HomePage,
  Project,
  SkillCategory,
  AcademicEntry,
} from '../../types/domain'

export type { Locale }

export interface ContentRepository {
  getSite(locale: Locale): Promise<Site>
  getHome(locale: Locale): Promise<HomePage>
  getProjects(locale: Locale): Promise<Project[]>
  getProjectBySlug(slug: string, locale: Locale): Promise<Project | null>
  getSkillCategories(locale: Locale): Promise<SkillCategory[]>
  getAcademic(locale: Locale): Promise<AcademicEntry[]>
}
