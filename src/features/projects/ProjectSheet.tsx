import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AppImage } from '@/components/AppImage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollAreaViewport } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { projects } from '@/content/projects'
import type { Project } from '@/content/types'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const ProjectGallery = lazy(() =>
  import('./ProjectGallery').then((module) => ({ default: module.ProjectGallery })),
)

interface ProjectSheetProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export function ProjectSheet({ project, isOpen, onClose }: ProjectSheetProps) {
  const { t } = useTranslation()
  const { activeProjectId, navigateProject } = usePortfolioStore()
  const scrollViewportRef = useRef<HTMLDivElement>(null)
  const currentIndex = projects.findIndex((entry) => entry.id === activeProjectId)
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  const period = project.periodKey ? t(project.periodKey, { ns: 'projects' }) : project.period

  useLayoutEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop = 0
    }
  }, [project.id])

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        className="overflow-hidden bg-background text-primary"
        aria-describedby={undefined}
        closeLabel={t('common.close', { defaultValue: 'Close' })}
      >
        <div className="shrink-0 border-b border-border px-5 pb-3 pt-4 pr-14">
          <SheetHeader>
            <SheetTitle className="text-xl text-primary sm:text-2xl">{project.title}</SheetTitle>
            <SheetDescription className="text-xs text-secondary sm:text-sm">
              {project.company ?? project.title}
              {period ? ` · ${period}` : ''}
            </SheetDescription>
          </SheetHeader>
        </div>

        <ScrollArea className="min-h-0 flex-1">
          <ScrollAreaViewport ref={scrollViewportRef}>
            <div className="space-y-8 px-6 py-6">
              <div className="overflow-hidden rounded-none border border-border bg-surface-muted">
                <AppImage src={project.cover} alt={project.title} className="w-full" />
              </div>

              <div className="grid gap-6 md:grid-cols-project-details">
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 font-mono text-caption uppercase tracking-editorial text-secondary">
                      {t('project.role', { defaultValue: 'Role' })}
                    </div>
                    <p className="text-lg text-primary">{t(project.roleKey, { ns: 'projects' })}</p>
                  </div>

                  <div>
                    <div className="mb-2 font-mono text-caption uppercase tracking-editorial text-secondary">
                      {t('project.description', { defaultValue: 'Description' })}
                    </div>
                    <p className="leading-7 text-primary/80">
                      {t(project.descriptionKey, { ns: 'projects' })}
                    </p>
                  </div>

                  <div>
                    <div className="mb-2 font-mono text-caption uppercase tracking-editorial text-secondary">
                      {t('project.contribution', { defaultValue: 'Contribution' })}
                    </div>
                    <p className="leading-7 text-primary/80">
                      {t(project.contributionKey, { ns: 'projects' })}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="mb-2 font-mono text-caption uppercase tracking-editorial text-secondary">
                      {t('project.technologies', { defaultValue: 'Technologies' })}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <Badge key={technology} variant="outline">
                          {technology}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {project.website && (
                    <Button
                      asChild
                      variant="outline"
                      className="group h-auto gap-2 rounded-none bg-surface-interactive px-3 py-2 text-sm text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-surface-interactive hover:text-accent"
                    >
                      <a href={project.website} target="_blank" rel="noreferrer">
                        {t('project.website', { defaultValue: 'Project website' })}
                        <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {project.gallery.length > 0 && (
                <Suspense
                  fallback={
                    <div aria-hidden="true" className="space-y-4">
                      <Skeleton className="mb-4 h-3 w-16" />
                      <Skeleton className="aspect-[16/10] w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-6" />
                        <Skeleton className="h-6 w-6" />
                      </div>
                    </div>
                  }
                >
                  <ProjectGallery key={project.id} project={project} />
                </Suspense>
              )}
            </div>
          </ScrollAreaViewport>
        </ScrollArea>

        <div className="shrink-0">
          <Separator />
          <div className="flex items-center justify-between gap-3 px-4 py-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => previousProject && navigateProject(-1)}
              disabled={!previousProject}
              className="gap-2 text-primary hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('project.previous', { defaultValue: 'Previous' })}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => nextProject && navigateProject(1)}
              disabled={!nextProject}
              className="gap-2 text-primary hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t('project.next', { defaultValue: 'Next' })}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
