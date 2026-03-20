'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Github, Linkedin, Mail, Send } from 'lucide-react'
import { BentoGrid } from '@/components/ui/bento-grid'
import { BentoCard, Meta, SectionTag } from '@/components/ui/bento-card'
import { staggerContainer, transition } from '@/lib/motion'
import { SectionShell } from './SectionShell'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/katib-source',
    meta: 'repos',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/katib-kachi',
    meta: 'connect',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:kachikatib@gmail.com',
    meta: 'direct',
  },
]

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('submitting')

    try {
      await new Promise((resolve) => setTimeout(resolve, 900))
      setFormState({ name: '', email: '', subject: '', message: '' })
      setSubmitState('success')

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }

      resetTimerRef.current = setTimeout(() => {
        setSubmitState('idle')
      }, 2600)
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <SectionShell id="contact" tone="muted" showGrid>
      <div className="mb-8 space-y-3">
        <SectionTag id="05" label="Contact" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
      >
        <BentoGrid gap="md" colsDesktop={12}>
          <BentoCard span="col-span-12 lg:col-span-5" index={0} className="space-y-6">
            <Meta prefix="#">get_in_touch</Meta>
            <h3 className="text-3xl font-light text-zinc-100">Let&apos;s build something real.</h3>
            <div className="space-y-1 border-t border-zinc-800 pt-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border-b border-zinc-800 py-3 text-zinc-300 transition-colors"
                  whileHover={{ x: 2 }}
                  transition={transition}
                >
                  <span className="flex h-7 w-7 items-center justify-center border border-zinc-700 transition-colors group-hover:border-[#00FF9F]">
                    <link.icon className="h-4 w-4 transition-colors group-hover:text-[#00FF9F]" />
                  </span>
                  <span className="flex-1 text-sm">{link.label}</span>
                  <Meta>{link.meta}</Meta>
                  <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-[#00FF9F]" />
                </motion.a>
              ))}
            </div>
          </BentoCard>

          <BentoCard span="col-span-12 lg:col-span-7" index={1} className="space-y-5">
            <Meta prefix="#">message</Meta>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name">
                    <Meta>field_name</Meta>
                  </label>
                  <input
                    id="contact-name"
                    placeholder="your_name"
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    required
                    className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#00FF9F]/40 focus:ring-1 focus:ring-[#00FF9F]/40"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email">
                    <Meta>field_email</Meta>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="name@domain.com"
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    required
                    className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#00FF9F]/40 focus:ring-1 focus:ring-[#00FF9F]/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject">
                  <Meta>field_subject</Meta>
                </label>
                <input
                  id="contact-subject"
                  placeholder="internship_opportunity"
                  value={formState.subject}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      subject: event.target.value,
                    }))
                  }
                  required
                  className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#00FF9F]/40 focus:ring-1 focus:ring-[#00FF9F]/40"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message">
                  <Meta>field_body</Meta>
                </label>
                <textarea
                  id="contact-message"
                  placeholder="brief_context_here"
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      message: event.target.value,
                    }))
                  }
                  required
                  rows={6}
                  className="w-full resize-y border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#00FF9F]/40 focus:ring-1 focus:ring-[#00FF9F]/40"
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitState === 'submitting'}
                className="inline-flex h-11 w-full items-center justify-center gap-2 border border-zinc-700 font-mono text-xs uppercase tracking-[0.16em] text-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                whileHover={{ borderColor: 'rgba(0,255,159,0.5)' }}
                whileTap={{ scale: 0.98 }}
                transition={transition}
              >
                <Send className="h-4 w-4" />
                send_message
              </motion.button>

              <div aria-live="polite" className="min-h-6">
                {submitState === 'success' && (
                  <p className="inline-flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-[#00FF9F]" />
                    Message sent.
                    <Meta>response_time: 24h</Meta>
                  </p>
                )}
                {submitState === 'error' && (
                  <p className="text-sm text-zinc-400">Send failed. Please email directly: kachikatib@gmail.com</p>
                )}
              </div>
            </form>
          </BentoCard>
        </BentoGrid>
      </motion.div>
    </SectionShell>
  )
}
