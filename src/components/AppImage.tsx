import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const [imageState, setImageState] = useState<{ src: string; state: AppImageState }>({
    src,
    state: 'loading',
  })
  const state = imageState.src === src ? imageState.state : 'loading'

  return (
    <div className={cn('relative overflow-hidden rounded-none bg-surface-interactive', className)}>
      {state !== 'loaded' && state !== 'error' && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" aria-hidden="true" />
      )}

      {state === 'error' ? (
        <div
          role="img"
          aria-label={t('common.imageUnavailable', { defaultValue: 'Image unavailable' })}
          className="flex min-h-55 items-center justify-center bg-surface-interactive px-4 text-center text-sm text-secondary"
        >
          {t('common.imageUnavailable', { defaultValue: 'Image unavailable' })}
        </div>
      ) : (
        <img
          key={src}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageState({ src, state: 'loaded' })}
          onError={() => setImageState({ src, state: 'error' })}
          className={cn(
            'h-full w-full object-contain transition-opacity duration-300',
            state === 'loaded' ? 'opacity-100' : 'opacity-0',
            imageClassName,
          )}
        />
      )}
    </div>
  )
}
