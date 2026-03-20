import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionTone = 'default' | 'muted' | 'accent'

const toneClasses: Record<SectionTone, string> = {
  default: '',
  muted: 'bg-[#050505]',
  accent: 'bg-[#050505]',
}

export type SectionShellProps = {
  id: string
  children: ReactNode
  className?: string
  contentClassName?: string
  tone?: SectionTone
  showGrid?: boolean
}

export function SectionShell({
  id,
  children,
  className,
  contentClassName,
  tone = 'default',
  showGrid = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        'portfolio-section relative py-24 md:py-32 px-6 md:px-12 lg:px-20',
        toneClasses[tone],
        className
      )}
    >
      {showGrid && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 portfolio-grid-overlay"
        />
      )}
      <div className={cn('relative z-10 mx-auto w-full max-w-[1400px]', contentClassName)}>
        {children}
      </div>
    </section>
  )
}
