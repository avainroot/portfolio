import { BriefcaseBusiness, GitBranch, Link, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteContent } from '@/content/site'

export function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="mt-20 border-t border-border pt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-caption uppercase tracking-editorial text-secondary">
          {t('contact.title', { defaultValue: 'Contact' })}
        </p>
      </div>
      <Separator className="mb-6" />

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {siteContent.contactLinks.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
            className="group block min-w-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
          >
            <Card className="flex min-w-0 items-center gap-2 rounded-md bg-surface p-2 text-left transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:bg-surface-interactive sm:gap-3 sm:p-3">
              <ContactIcon label={contact.label} />
              <div className="min-w-0">
                <div className="truncate text-xs text-secondary sm:text-sm">{contact.label}</div>
                <div className="break-all text-xs leading-tight text-primary sm:text-sm">
                  {contact.value}
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}

function ContactIcon({ label }: { label: string }) {
  const Icon =
    label === 'Telegram'
      ? Send
      : label === 'HH.ru'
        ? BriefcaseBusiness
        : label === 'GitHub'
          ? GitBranch
          : Link

  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border bg-background text-accent transition-transform duration-200 group-hover:scale-105">
      <Icon aria-hidden="true" className="h-4 w-4" />
    </span>
  )
}
