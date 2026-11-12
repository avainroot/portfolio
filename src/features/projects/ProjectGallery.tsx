import { useTranslation } from 'react-i18next'

import { AppImage } from '@/components/AppImage'
import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Project } from '@/content/types'

export function ProjectGallery({ project }: { project: Project }) {
  const { t } = useTranslation()

  return (
    <div>
      <div className="mb-4 font-mono text-caption uppercase tracking-editorial text-secondary">
        {t('project.gallery', { defaultValue: 'Gallery' })}
      </div>

      <Carousel opts={{ loop: false }} className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden gap-2 md:flex">
              <CarouselPrevious
                aria-label={t('project.galleryPrevious', { defaultValue: 'Previous image' })}
              />
              <CarouselNext aria-label={t('project.galleryNext', { defaultValue: 'Next image' })} />
            </div>
            <CarouselIndicators
              label={t('project.gallery', { defaultValue: 'Gallery' })}
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
                alt={t('project.galleryImageAlt', {
                  title: project.title,
                  number: index + 1,
                  defaultValue: `${project.title} screenshot ${index + 1}`,
                })}
                className="w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
