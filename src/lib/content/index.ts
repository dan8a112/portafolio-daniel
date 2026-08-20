import { localRepository } from './local'
import { sanityRepository } from './sanity'
import type { ContentRepository } from './repository'

export type { Locale } from './repository'
export type * from '../../types/domain'

const source = import.meta.env.CONTENT_SOURCE || 'local'

const repository: ContentRepository =
  source === 'sanity' ? sanityRepository : localRepository

export { repository }

export const getSite = repository.getSite.bind(repository)
export const getHome = repository.getHome.bind(repository)
export const getProjects = repository.getProjects.bind(repository)
export const getProjectBySlug = repository.getProjectBySlug.bind(repository)
export const getSkillCategories = repository.getSkillCategories.bind(repository)
export const getAcademic = repository.getAcademic.bind(repository)
