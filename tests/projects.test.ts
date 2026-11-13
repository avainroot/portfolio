// Runtime validation coverage for: localized project content and screenshot assets.
import { cwd } from 'node:process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

import { projects } from '@/content/projects'
import enProjects from '@/i18n/locales/en/projects.json'
import ruProjects from '@/i18n/locales/ru/projects.json'

const translations = [
  ruProjects.projects as Record<string, unknown>,
  enProjects.projects as Record<string, unknown>,
]

function getTranslation(source: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((current, part) => {
    if (typeof current !== 'object' || current === null || !(part in current)) {
      return undefined
    }

    return (current as Record<string, unknown>)[part]
  }, source)
}

function hasSourceImage(publicUrl: string): boolean {
  const assetPath = new URL(publicUrl, 'https://portfolio.local').pathname
  const relativePath = assetPath.slice(import.meta.env.BASE_URL.length)
  const imagePath = resolve(cwd(), 'src', 'assets', relativePath)
  const sourceStem = imagePath.replace(/\.avif$/i, '')

  return ['.png', '.jpg', '.jpeg', '.webp', '.svg'].some((extension) =>
    existsSync(`${sourceStem}${extension}`),
  )
}

describe('project content', () => {
  it('provides every project text in Russian and English', () => {
    const projectIds = projects.map((project) => project.id)

    expect(new Set(projectIds).size).toBe(projects.length)

    for (const project of projects) {
      const keys = [project.shortDescriptionKey, project.descriptionKey, project.contributionKey]

      for (const translationsForLocale of translations) {
        for (const key of keys) {
          expect(getTranslation(translationsForLocale, key)).toBeTypeOf('string')
        }
      }

      expect(project.company.trim()).not.toBe('')
      expect(project.companyUrl).toMatch(/^https:\/\//)
    }
  })

  it('uses the correct company and project websites', () => {
    expect(
      projects.map(({ id, company, companyUrl, website }) => ({
        id,
        company,
        companyUrl,
        website,
      })),
    ).toEqual([
      {
        id: 'nsign',
        company: 'Nsign',
        companyUrl: 'https://nsign.ru/',
        website: 'https://nsign.ru/',
      },
      {
        id: 'harbour-space',
        company: 'Harbour.Space',
        companyUrl: 'https://harbour.space/',
        website: 'https://harbour.space/articles/home',
      },
      {
        id: 'seafood-shop',
        company: 'СЕМПРОГРУПП',
        companyUrl: 'https://spg-agency.ru/',
        website: 'https://seafood-shop.ru/',
      },
    ])
  })

  it('references original screenshots for every card and gallery image', () => {
    for (const project of projects) {
      for (const image of [project.cover, ...project.gallery]) {
        expect(hasSourceImage(image), `${project.id}: ${image}`).toBe(true)
      }
    }
  })
})
