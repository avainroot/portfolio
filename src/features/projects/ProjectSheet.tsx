import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AppImage } from '@/components/AppImage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ScrollArea, ScrollAreaViewport } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
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

interface ProjectSheetProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export function ProjectSheet({ project, isOpen, onClose }: ProjectSheetProps) {
  const { t } = useTranslation()
  const { activeProjectId, navigateProject } = usePortfolioStore()
  const currentIndex = projects.findIndex((entry) => entry.id === activeProjectId)
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        className="overflow-hidden bg-background text-primary"
        aria-describedby={undefined}
      >
        <div className="shrink-0 border-b border-border px-5 pb-3 pt-4 pr-14">
          <SheetHeader>
            <SheetTitle className="text-xl text-primary sm:text-2xl">{project.title}</SheetTitle>
            <SheetDescription className="text-xs text-secondary sm:text-sm">
              {project.company ?? project.title}
              {project.period ? ` · ${project.period}` : ''}
            </SheetDescription>
          </SheetHeader>
        </div>

        <ScrollArea className="min-h-0 flex-1">
          <ScrollAreaViewport>
            <div className="space-y-8 px-6 py-6">
              <div className="overflow-hidden rounded-md border border-border bg-surface-muted">
                <AppImage src={project.cover} alt={project.title} className="h-75 w-full" />
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
                      className="group h-auto gap-2 rounded-md bg-surface-interactive px-3 py-2 text-sm text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-surface-interactive hover:text-accent"
                    >
                      <a href={project.website} target="_blank" rel="noreferrer">
                        {t('project.website', { defaultValue: 'Project website' })}
                        <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-4 font-mono text-caption uppercase tracking-editorial text-secondary">
                  {t('project.gallery', { defaultValue: 'Gallery' })}
                </div>

                <Carousel opts={{ loop: false }} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="hidden gap-2 md:flex">
                        <CarouselPrevious
                          aria-label={t('project.galleryPrevious', {
                            defaultValue: 'Previous image',
                          })}
                        />
                        <CarouselNext
                          aria-label={t('project.galleryNext', { defaultValue: 'Next image' })}
                        />
                      </div>
                      <CarouselIndicators
                        label={t('project.gallery')}
                        getSlideLabel={(index) =>
                          t('project.gallerySlide', {
                            number: index + 1,
                            defaultValue: `Slide ${index + 1}`,
                          })
                        }
                      />
                    </div>
                  </div>

                  <CarouselContent>
                    {project.gallery.map((image, index) => (
                      <CarouselItem key={`${project.id}-${index}`}>
                        <AppImage
                          src={image}
                          alt={`${project.title} gallery ${index + 1}`}
                          className="h-95 w-full md:h-105"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
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
