import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CarouselApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>

const CarouselContext = React.createContext<{
  api: CarouselApi | undefined
  viewportRef: ReturnType<typeof useEmblaCarousel>[0]
  selectedIndex: number
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel provider')
  }
  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    opts?: Record<string, unknown>
    setApi?: (api: CarouselApi | undefined) => void
    children: React.ReactNode
  }
>(({ children, ...props }, ref) => {
  const { opts, setApi, ...carouselProps } = props
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const [emblaRef, api] = useEmblaCarousel({ loop: false, ...opts })

  React.useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      const current = api.selectedScrollSnap()
      setSelectedIndex(current)
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    onSelect()
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  React.useEffect(() => {
    setApi?.(api)
  }, [api, setApi])

  const scrollPrev = () => api?.scrollPrev()
  const scrollNext = () => api?.scrollNext()

  return (
    <CarouselContext.Provider
      value={{
        api,
        viewportRef: emblaRef,
        selectedIndex,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div ref={ref} {...carouselProps}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { viewportRef } = useCarousel()

    return (
      <div ref={viewportRef} className="overflow-hidden">
        <div ref={ref} className={cn('-ml-4 flex', className)} {...props} />
      </div>
    )
  },
)
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('min-w-0 shrink-0 grow-0 basis-full pl-4', className)}
      {...props}
    />
  ),
)
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel()

    return (
      <Button
        ref={ref}
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          'rounded-full bg-surface text-primary hover:border-accent hover:bg-surface-elevated hover:text-accent disabled:cursor-not-allowed disabled:opacity-40',
          className,
        )}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    )
  },
)
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel()

    return (
      <Button
        ref={ref}
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          'rounded-full bg-surface text-primary hover:border-accent hover:bg-surface-elevated hover:text-accent disabled:cursor-not-allowed disabled:opacity-40',
          className,
        )}
        onClick={scrollNext}
        disabled={!canScrollNext}
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    )
  },
)
CarouselNext.displayName = 'CarouselNext'

function CarouselIndicators({
  label,
  getSlideLabel = (index) => `Slide ${index + 1}`,
  className,
}: {
  label: string
  getSlideLabel?: (index: number) => string
  className?: string
}) {
  const { api, selectedIndex } = useCarousel()
  const slideCount = api?.scrollSnapList().length ?? 0

  if (slideCount < 2) {
    return null
  }

  return (
    <div role="group" aria-label={label} className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: slideCount }, (_, index) => (
        <Button
          key={index}
          type="button"
          variant="ghost"
          size="icon"
          aria-label={getSlideLabel(index)}
          aria-pressed={selectedIndex === index}
          onClick={() => api?.scrollTo(index)}
          className="h-6 w-6 rounded-full p-0 hover:bg-transparent"
        >
          <span
            aria-hidden="true"
            className={cn(
              'h-1.5 w-1.5 rounded-full transition-colors',
              selectedIndex === index ? 'bg-accent' : 'bg-secondary/50',
            )}
          />
        </Button>
      ))}
    </div>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
}
