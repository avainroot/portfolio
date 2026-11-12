import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enProjects from '@/i18n/locales/en/projects.json'
import enSite from '@/i18n/locales/en/site.json'
import ruProjects from '@/i18n/locales/ru/projects.json'
import ruSite from '@/i18n/locales/ru/site.json'

const supportedLanguages = ['ru', 'en'] as const
const fallbackLanguage = 'ru' as const

const browserLanguage =
  typeof window !== 'undefined' ? window.localStorage.getItem('portfolio-language') : null
const selectedLanguage = supportedLanguages.includes(
  browserLanguage as (typeof supportedLanguages)[number],
)
  ? (browserLanguage as (typeof supportedLanguages)[number])
  : fallbackLanguage

if (typeof document !== 'undefined') {
  document.documentElement.lang = selectedLanguage
}

const resources = {
  ru: {
    projects: ruProjects.projects,
    site: ruSite.site,
  },
  en: {
    projects: enProjects.projects,
    site: enSite.site,
  },
}

void i18n.use(initReactI18next).init({
  resources,
  lng: selectedLanguage,
  fallbackLng: fallbackLanguage,
  defaultNS: 'site',
  ns: ['site', 'projects'],
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (language) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
  }
})

export const setLanguage = (language: 'ru' | 'en') => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('portfolio-language', language)
  }
  void i18n.changeLanguage(language)
}

export default i18n
