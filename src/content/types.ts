export interface Project {
  id: string
  number: string
  title: string
  company?: string
  period?: string
  roleKey: string
  shortDescriptionKey: string
  descriptionKey: string
  contributionKey: string
  technologies: string[]
  website?: string
  cover: string
  gallery: string[]
}

export interface ContactLink {
  label: string
  href: string
  value: string
}
