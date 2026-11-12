import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-micro uppercase tracking-chip transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-accent text-background',
        secondary: 'border-transparent bg-tag text-accent',
        outline: 'border-border bg-transparent text-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
