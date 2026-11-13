export interface Project {
  id: string
  title: string
  company: string
  companyUrl?: string
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
