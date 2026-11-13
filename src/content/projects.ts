import type { Project } from '@/content/types'

const base = import.meta.env.BASE_URL

function shuffleProjects<T>(items: readonly T[]): T[] {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentItem = shuffled[index]
    shuffled[index] = shuffled[randomIndex]
    shuffled[randomIndex] = currentItem
  }

  return shuffled
}

const projectData: Project[] = [
  {
    id: 'nsign',
    title: 'Nsign',
    company: 'Nsign',
    companyUrl: 'https://nsign.ru/',
    shortDescriptionKey: 'nsign.shortDescription',
    descriptionKey: 'nsign.description',
    contributionKey: 'nsign.contribution',
    technologies: ['React', 'Next.js 16', 'TypeScript', 'Zustand', 'TanStack Query', 'hey-api'],
    website: 'https://nsign.ru/',
    cover: `${base}images/nsign/cover.avif`,
    gallery: [
      `${base}images/nsign/cover.avif`,
      `${base}images/nsign/detail-1.avif`,
      `${base}images/nsign/detail-2.avif`,
      `${base}images/nsign/detail-3.avif`,
    ],
  },
  {
    id: 'harbour-space',
    title: 'Harbour.Space Blog',
    company: 'Harbour.Space',
    companyUrl: 'https://harbour.space/',
    shortDescriptionKey: 'harbour-space.shortDescription',
    descriptionKey: 'harbour-space.description',
    contributionKey: 'harbour-space.contribution',
    technologies: ['React', 'Next.js', 'TypeScript', 'Strapi', 'REST API'],
    website: 'https://harbour.space/articles/home',
    cover: `${base}images/harbour-space/cover.avif`,
    gallery: [
      `${base}images/harbour-space/cover.avif`,
      `${base}images/harbour-space/detail-1.avif`,
      `${base}images/harbour-space/detail-2.avif`,
      `${base}images/harbour-space/detail-3.avif`,
    ],
  },
  {
    id: 'seafood-shop',
    title: 'Seafood Shop',
    company: 'СЕМПРОГРУПП',
    companyUrl: 'https://spg-agency.ru/',
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
    gallery: [
      `${base}images/seafood-shop/cover.avif`,
      `${base}images/seafood-shop/detail-1.avif`,
      `${base}images/seafood-shop/detail-2.avif`,
      `${base}images/seafood-shop/detail-3.avif`,
    ],
  },
  {
    id: 'visa-sk',
    title: 'Центр по миграционной поддержке',
    company: 'Interlabs',
    companyUrl: 'https://www.interlabs.ru/',
    shortDescriptionKey: 'visa-sk.shortDescription',
    descriptionKey: 'visa-sk.description',
    contributionKey: 'visa-sk.contribution',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', '1С-Битрикс', 'Адаптивная вёрстка'],
    website: 'https://visa.sk.ru/',
    cover: `${base}images/visa-sk/cover.avif`,
    gallery: [
      `${base}images/visa-sk/cover.avif`,
      `${base}images/visa-sk/detail-1.avif`,
      `${base}images/visa-sk/detail-2.avif`,
      `${base}images/visa-sk/detail-3.avif`,
    ],
  },
  {
    id: 'metrostroy',
    title: 'Мосметрострой',
    company: 'Interlabs',
    companyUrl: 'https://www.interlabs.ru/',
    shortDescriptionKey: 'metrostroy.shortDescription',
    descriptionKey: 'metrostroy.description',
    contributionKey: 'metrostroy.contribution',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', '1С-Битрикс', 'Адаптивная вёрстка'],
    website: 'https://www.metrostroy.com/',
    cover: `${base}images/metrostroy/cover.avif`,
    gallery: [
      `${base}images/metrostroy/cover.avif`,
      `${base}images/metrostroy/detail-1.avif`,
      `${base}images/metrostroy/detail-2.avif`,
      `${base}images/metrostroy/detail-3.avif`,
    ],
  },
  {
    id: 'ostec-smart',
    title: 'Остек-СМТ',
    company: 'Interlabs',
    companyUrl: 'https://www.interlabs.ru/',
    shortDescriptionKey: 'ostec-smart.shortDescription',
    descriptionKey: 'ostec-smart.description',
    contributionKey: 'ostec-smart.contribution',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'jQuery',
      '1С-Битрикс',
      'Адаптивная вёрстка',
      'CSS3-анимации',
    ],
    website: 'https://ostec-smart.ru/',
    cover: `${base}images/ostec-smart/cover.avif`,
    gallery: [
      `${base}images/ostec-smart/cover.avif`,
      `${base}images/ostec-smart/detail-1.avif`,
      `${base}images/ostec-smart/detail-2.avif`,
      `${base}images/ostec-smart/detail-3.avif`,
    ],
  },
  {
    id: 'spark-interfax',
    title: 'SPARK',
    company: 'Interlabs',
    companyUrl: 'https://www.interlabs.ru/',
    shortDescriptionKey: 'spark-interfax.shortDescription',
    descriptionKey: 'spark-interfax.description',
    contributionKey: 'spark-interfax.contribution',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', '1С-Битрикс', 'Адаптивная вёрстка'],
    website: 'https://spark-interfax.com/',
    cover: `${base}images/spark-interfax/cover.avif`,
    gallery: [
      `${base}images/spark-interfax/cover.avif`,
      `${base}images/spark-interfax/detail-1.avif`,
      `${base}images/spark-interfax/detail-2.avif`,
      `${base}images/spark-interfax/detail-3.avif`,
    ],
  },
]

export const projects = shuffleProjects(projectData)
