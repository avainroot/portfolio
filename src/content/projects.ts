import type { Project } from '@/content/types'

const base = import.meta.env.BASE_URL

export const projects: Project[] = [
  {
    id: 'harbour-space',
    number: '01',
    title: 'Harbour.Space Blog',
    company: 'Harbour.Space',
    roleKey: 'harbour-space.role',
    shortDescriptionKey: 'harbour-space.shortDescription',
    descriptionKey: 'harbour-space.description',
    contributionKey: 'harbour-space.contribution',
    technologies: ['React', 'Next.js', 'TypeScript', 'Strapi', 'REST API'],
    website: 'https://harbour.space/articles/home',
    cover: `${base}images/harbour-space/cover.avif`,
    gallery: [
      `${base}images/harbour-space/cover.avif`,
      `${base}images/harbour-space/detail-1.avif`,
    ],
  },
  {
    id: 'seafood-shop',
    number: '02',
    title: 'Seafood Shop',
    company: 'Seafood Shop',
    periodKey: 'seafood-shop.period',
    roleKey: 'seafood-shop.role',
    shortDescriptionKey: 'seafood-shop.shortDescription',
    descriptionKey: 'seafood-shop.description',
    contributionKey: 'seafood-shop.contribution',
    technologies: [
      'Headless Bitrix',
      'Next.js 14→15',
      'React 18/19 RC',
      'TypeScript',
      'Redux Toolkit',
      'Mantine',
      'Headless UI',
      'CSS Modules',
      'SCSS',
      'REST API',
      'Formik',
      'Yup',
      'SSR',
      'RSC',
    ],
    website: 'https://seafood-shop.ru/',
    cover: `${base}images/seafood-shop/cover.avif`,
    gallery: [`${base}images/seafood-shop/cover.avif`, `${base}images/seafood-shop/detail-1.avif`],
  },
]
