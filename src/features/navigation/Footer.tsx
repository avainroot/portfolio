import { useTranslation } from 'react-i18next'

import { Separator } from '@/components/ui/separator'

export function Footer() {
  const { t } = useTranslation()

  return (
    <>
      <Separator />
      <footer className="px-4 py-6 text-center sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-page items-center justify-between gap-4 text-xs uppercase tracking-editorial text-secondary">
          <span>{t('footer', { defaultValue: 'Portfolio' })}</span>
          <span>© 2026</span>
        </div>
      </footer>
    </>
  )
}
