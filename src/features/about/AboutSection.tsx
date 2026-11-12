import { useTranslation } from 'react-i18next'

import { Separator } from '@/components/ui/separator'
import { siteContent } from '@/content/site'

export function AboutSection() {
  const { t } = useTranslation()

  return (
    <section id="about" className="mt-20 pt-10">
      <Separator className="mb-10" />
      <div className="grid gap-6 md:grid-cols-about md:items-start">
        <p className="font-mono text-caption uppercase tracking-editorial text-secondary">
          {t('about.title', { defaultValue: 'About' })}
        </p>
        <div className="space-y-4 text-lg leading-8 text-primary/80 sm:text-xl">
          <p>
            {t('about.body', {
              defaultValue:
                'Building interfaces with a clear product focus and measured engineering decisions.',
            })}
          </p>
          <p className="text-secondary">
            {siteContent.specialization} · {siteContent.stack.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  )
}
