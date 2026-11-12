import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AppImage } from '@/components/AppImage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Project } from '@/content/types'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: () => void
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, delay: index * 0.06 }}
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      className="h-full"
    >
      <Card className="group relative flex h-full flex-col overflow-hidden">
        <AppImage
          src={project.cover}
          alt={project.title}
          className="aspect-[16/10] w-full shrink-0 rounded-none border-b border-border bg-surface-muted"
          imageClassName="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <CardHeader className="gap-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-caption uppercase tracking-editorial text-secondary">
              {project.number}
            </span>
            <Badge variant="secondary">{t(project.roleKey, { ns: 'projects' })}</Badge>
          </div>

          <CardTitle className="text-2xl">{project.title}</CardTitle>
          <CardDescription>{t(project.shortDescriptionKey, { ns: 'projects' })}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((technology) => (
            <Badge key={technology} variant="outline">
              {technology}
            </Badge>
          ))}
        </CardContent>

        <CardFooter className="relative mt-auto justify-between pt-4 text-sm text-primary transition-colors group-hover:text-accent">
          <Separator className="absolute inset-x-0 top-0" />
          <span>{t('common.viewProject', { defaultValue: 'View project' })}</span>
          <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </CardFooter>

        <Button
          type="button"
          variant="ghost"
          onClick={onOpen}
          aria-label={`${t('common.viewProject', { defaultValue: 'View project' })}: ${project.title}`}
          className="absolute inset-0 z-10 h-full w-full rounded-none p-0 active:scale-100 hover:bg-transparent focus-visible:ring-inset"
        />
      </Card>
    </motion.article>
  )
}
