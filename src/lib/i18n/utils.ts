export type Locale = 'es' | 'en'

export const locales: Locale[] = ['es', 'en']
export const defaultLocale: Locale = 'es'

export function getLocaleFromUrl(pathname: string): Locale {
  const segment = pathname.split('/')[1]
  return segment === 'en' ? 'en' : 'es'
}

export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith('/')) return path
  if (path === '/') return `/${locale}`
  return `/${locale}${path}`
}

export function getLocalizedPathname(pathname: string, targetLocale: Locale): string {
  const currentLocale = getLocaleFromUrl(pathname)
  if (pathname === `/${currentLocale}`) return `/${targetLocale}`
  if (pathname.startsWith(`/${currentLocale}/`)) {
    return pathname.replace(`/${currentLocale}/`, `/${targetLocale}/`)
  }
  return `/${targetLocale}${pathname}`
}
