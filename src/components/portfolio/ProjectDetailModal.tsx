'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react'
import { BentoGrid } from '@/components/ui/bento-grid'
import { Meta } from '@/components/ui/bento-card'
import { scaleIn, staggerContainer, transition } from '@/lib/motion'

export interface ProjectData {
  id: string
  title: string
  subtitle?: string
  description: string
  features?: string[]
  stack: string[]
  status: 'shipped' | 'in-progress' | 'archived'
  timeline?: string
  role?: string
  github?: string
  live?: string
  metrics?: {
    label: string
    value: string
  }[]
}

type ProjectDetailModalProps = {
  project: ProjectData | null
  onClose: () => void
}

const statusConfig = {
  shipped: {
    dot: 'bg-[#00FF9F]',
    text: 'SHIPPED',
    pulse: false,
  },
  'in-progress': {
    dot: 'bg-amber-400',
    text: 'IN PROGRESS',
    pulse: true,
  },
  archived: {
    dot: 'bg-zinc-500',
    text: 'ARCHIVED',
    pulse: false,
  },
} as const

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [project])

  useEffect(() => {
    if (!project) {
      return
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null

    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector)
    focusable?.[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return
      }

      const nodes = panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      if (!nodes.length) {
        event.preventDefault()
        return
      }

      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          onClick={onClose}
        >
          <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              ref={panelRef}
              tabIndex={-1}
              className="h-[92vh] w-full max-w-7xl overflow-hidden border border-zinc-800 bg-[#0a0a0a]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 md:px-6">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-[#00FF9F]">#{project.id}</p>
                  <h3 className="truncate text-sm font-medium text-zinc-100">{project.title}</h3>
                  {project.subtitle && <Meta>{project.subtitle}</Meta>}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-7 w-7 items-center justify-center border border-zinc-700 text-zinc-400 transition-colors hover:border-[#00FF9F] hover:text-[#00FF9F]"
                  aria-label="Close project detail"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="h-[calc(92vh-57px)] overflow-y-auto">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-12"
                >
                  <div className="col-span-12 space-y-8 p-6 lg:col-span-8 lg:border-r lg:border-zinc-800 md:p-8">
                    <div className="space-y-2">
                      <Meta prefix="#">description</Meta>
                      <p className="text-sm leading-relaxed text-zinc-300">{project.description}</p>
                    </div>

                    {project.features && project.features.length > 0 && (
                      <div className="space-y-3">
                        <Meta prefix="#">features</Meta>
                        <ul className="space-y-2">
                          {project.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                              <span className="mt-2 h-1 w-1 bg-[#00FF9F]" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.metrics && project.metrics.length > 0 && (
                      <div className="space-y-3">
                        <Meta prefix="#">metrics</Meta>
                        <BentoGrid gap="sm" colsDesktop={12}>
                          {project.metrics.map((metric, index) => (
                            <div
                              key={`${metric.label}-${metric.value}`}
                              className="col-span-12 border border-zinc-800 bg-zinc-900 p-3 sm:col-span-6 lg:col-span-4"
                            >
                              <Meta>{metric.label}</Meta>
                              <p className="mt-1 text-base font-medium text-zinc-100">{metric.value}</p>
                            </div>
                          ))}
                        </BentoGrid>
                      </div>
                    )}
                  </div>

                  <div className="col-span-12 space-y-6 p-6 lg:col-span-4 md:p-8">
                    <div className="space-y-2 border-b border-zinc-800 pb-4">
                      <Meta>status</Meta>
                      <div className="inline-flex items-center gap-2 text-xs text-zinc-300">
                        <span
                          className={`${statusConfig[project.status].dot} h-2 w-2 rounded-full ${
                            statusConfig[project.status].pulse ? 'animate-pulse' : ''
                          }`}
                        />
                        {statusConfig[project.status].text}
                      </div>
                    </div>

                    <div className="space-y-2 border-b border-zinc-800 pb-4">
                      <Meta>stack</Meta>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] text-zinc-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.timeline && (
                      <div className="space-y-2 border-b border-zinc-800 pb-4">
                        <Meta>timeline</Meta>
                        <p className="text-sm text-zinc-300">{project.timeline}</p>
                      </div>
                    )}

                    {project.role && (
                      <div className="space-y-2 border-b border-zinc-800 pb-4">
                        <Meta>role</Meta>
                        <p className="text-sm text-zinc-300">{project.role}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Meta>links</Meta>
                      <div className="space-y-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 border border-zinc-800 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-[#00FF9F] hover:text-[#00FF9F]"
                          >
                            <Github className="h-4 w-4" />
                            <span className="flex-1">source</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 border border-zinc-800 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-[#00FF9F] hover:text-[#00FF9F]"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="flex-1">live</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
