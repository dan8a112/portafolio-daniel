import es from '../../i18n/es.json'
import en from '../../i18n/en.json'
import type { Locale } from './utils'

const dictionaries = { es, en }

export function useTranslations(locale: Locale) {
  return function t(key: string): string {
    const value = (dictionaries[locale] as Record<string, string>)[key]
    if (!value) {
      console.warn(`Missing translation: ${key} for ${locale}`)
    }
    return value ?? (dictionaries.es as Record<string, string>)[key] ?? key
  }
}
