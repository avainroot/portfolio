import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

type AppImageState = 'loading' | 'loaded' | 'error'

interface AppImageProps {
  src: string
  alt: string
  className?: string
  imageClassName?: string
}

export function AppImage({ src, alt, className, imageClassName }: AppImageProps) {
  const [state, setState] = useState<AppImageState>('loading')

  useEffect(() => {
    setState('loading')
  }, [src])

  return (
    <div className={cn('relative overflow-hidden rounded-sm bg-surface-interactive', className)}>
      {state !== 'loaded' && state !== 'error' && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" aria-hidden="true" />
      )}

      {state === 'error' ? (
        <div className="flex min-h-55 items-center justify-center bg-surface-interactive px-4 text-center text-sm text-secondary">
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            state === 'loaded' ? 'opacity-100' : 'opacity-0',
            imageClassName,
          )}
        />
      )}
    </div>
  )
}
