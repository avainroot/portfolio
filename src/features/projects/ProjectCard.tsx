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
      className="h-full"
    >
      <Card className="group relative flex h-full flex-col overflow-hidden border-border/70 bg-background/35 transition-colors duration-300 hover:bg-surface/75">
        <AppImage
          src={project.cover}
          alt={project.title}
          className="w-full shrink-0 rounded-none border-b border-border/70 bg-surface-muted"
        />

        <CardHeader className="gap-2">
          <CardTitle className="text-xl sm:text-2xl">{project.title}</CardTitle>
          <p className="font-mono text-micro uppercase tracking-editorial text-secondary">
            {project.company}
          </p>
          <CardDescription className="pt-2">
            {t(project.shortDescriptionKey, { ns: 'projects' })}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((technology) => (
            <Badge
              key={technology}
              variant="outline"
              className="px-2 py-0.5 text-[9px] tracking-[0.06em] text-secondary/90"
            >
              <span className="relative top-px">{technology}</span>
            </Badge>
          ))}
        </CardContent>

        <CardFooter className="relative mt-auto justify-between pt-4 text-sm text-primary transition-colors group-hover:text-accent">
          <Separator className="absolute inset-x-0 top-0" />
          <span className="relative top-px">
            {t('common.viewProject', { defaultValue: 'View project' })}
          </span>
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
