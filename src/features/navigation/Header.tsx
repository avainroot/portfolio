import { BriefcaseBusiness, GitBranch, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type Language = 'ru' | 'en'

interface HeaderProps {
  language: Language
  onToggleLanguage: () => void
}

export function Header({ language, onToggleLanguage }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-page items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex shrink-0 flex-col text-[13px] font-semibold uppercase leading-none tracking-tight text-accent sm:text-sm">
            <span className={language === 'en' ? 'tracking-[0.027em]' : undefined}>
              {t('header.firstName')}
            </span>
            <span className={language === 'ru' ? 'tracking-[0.062em]' : undefined}>
              {t('header.lastName')}
            </span>
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-caption font-medium text-primary sm:text-sm">
              {t('header.role', { defaultValue: 'Frontend developer' })}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-normal text-secondary sm:text-micro sm:tracking-editorial">
              {t('header.stack', { defaultValue: 'React, TypeScript, Next.js' })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden h-auto gap-1.5 rounded-none px-1 py-1 font-mono text-caption uppercase tracking-editorial text-secondary transition-transform hover:-translate-y-0.5 hover:bg-transparent hover:text-accent sm:inline-flex"
          >
            <a
              href="https://tula.hh.ru/resume/9f0ad0d7ff116479db0039ed1f4e464d7a3462?print=true"
              target="_blank"
              rel="noreferrer"
            >
              <BriefcaseBusiness aria-hidden="true" className="h-3.5 w-3.5" />
              HH
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden h-auto gap-1.5 rounded-none px-1 py-1 font-mono text-caption uppercase tracking-editorial text-secondary transition-transform hover:-translate-y-0.5 hover:bg-transparent hover:text-accent sm:inline-flex"
          >
            <a
              href="https://github.com/avainroot?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch aria-hidden="true" className="h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden h-auto gap-1.5 rounded-none px-1 py-1 font-mono text-caption uppercase tracking-editorial text-secondary transition-transform hover:-translate-y-0.5 hover:bg-transparent hover:text-accent sm:inline-flex"
          >
            <a href="https://t.me/avainroot" target="_blank" rel="noreferrer">
              <Send aria-hidden="true" className="h-3.5 w-3.5" />
              Telegram
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onToggleLanguage}
            className="h-8 min-w-10 justify-center rounded-none border-border px-2.5 font-mono text-micro uppercase leading-none tracking-control text-primary hover:border-accent hover:text-accent"
          >
            {language === 'ru' ? 'EN' : 'RU'}
          </Button>
        </div>
      </div>
      <Separator />
    </header>
  )
}
