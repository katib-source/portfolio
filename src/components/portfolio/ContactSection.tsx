'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Github, Globe, Linkedin, Mail, Phone, Send } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUp, staggerContainer, transition } from '@/lib/motion'
import { SectionShell } from './SectionShell'

type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'kachikatib@gmail.com',
    href: 'mailto:kachikatib@gmail.com',
  },
  {
    icon: Phone,
    label: 'Telephone',
    value: 'Disponible sur demande',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'www.katib.me',
    href: 'https://www.katib.me',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/katib-kachi',
    href: 'https://linkedin.com/in/katib-kachi',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/katib-source',
    href: 'https://github.com/katib-source',
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

  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/maqpzaqq'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('sending')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        setSubmitState('error')
        return
      }

      setFormState({ name: '', email: '', subject: '', message: '' })
      form.reset()
      setSubmitState('sent')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <SectionShell id="contact" className="bg-surface py-20 md:py-24" contentClassName="max-w-[1200px]">
      <div className="mb-8">
        <SectionHeader title="CONTACT" id="contact-heading" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
        className="space-y-6"
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          className="rounded-lg border border-border bg-primary-light px-5 py-5"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contactLinks.map((item) => {
              const content = (
                <>
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="font-sans text-sm text-text-secondary">
                    <span className="font-semibold text-primary">{item.label}:</span> {item.value}
                  </span>
                </>
              )

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-2 rounded-lg border border-transparent px-2 py-1 transition-colors hover:border-border"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="inline-flex items-center gap-2 rounded-lg px-2 py-1">
                  {content}
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <Card className="bg-surface-white">
            <div className="space-y-5">
              <h3 className="font-sans text-lg font-semibold text-primary">Envoyez-moi un message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="font-sans text-sm text-text-secondary">
                      Nom
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Votre nom"
                      value={formState.name}
                      onChange={(event) =>
                        setFormState((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                      required
                      className="w-full rounded-lg border border-border bg-surface-white px-4 py-3 font-sans text-sm text-text-primary outline-none transition-shadow placeholder:text-text-muted focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="font-sans text-sm text-text-secondary">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formState.email}
                      onChange={(event) =>
                        setFormState((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      required
                      className="w-full rounded-lg border border-border bg-surface-white px-4 py-3 font-sans text-sm text-text-primary outline-none transition-shadow placeholder:text-text-muted focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="font-sans text-sm text-text-secondary">
                    Sujet
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Sujet de votre message"
                    value={formState.subject}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        subject: event.target.value,
                      }))
                    }
                    required
                    className="w-full rounded-lg border border-border bg-surface-white px-4 py-3 font-sans text-sm text-text-primary outline-none transition-shadow placeholder:text-text-muted focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="font-sans text-sm text-text-secondary">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Ecrivez votre message"
                    value={formState.message}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        message: event.target.value,
                      }))
                    }
                    required
                    rows={6}
                    className="w-full resize-y rounded-lg border border-border bg-surface-white px-4 py-3 font-sans text-sm text-text-primary outline-none transition-shadow placeholder:text-text-muted focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitState === 'sending'}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 font-sans text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  transition={transition}
                >
                  <Send className="h-4 w-4" />
                  {submitState === 'sending' ? 'Envoi en cours...' : 'Contactez-moi'}
                </motion.button>

                <div aria-live="polite" className="min-h-6">
                  {submitState === 'sent' && (
                    <p className="inline-flex items-center gap-2 font-sans text-sm text-text-secondary">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Message envoye ! Je vous repondrai sous 24h.
                    </p>
                  )}
                  {submitState === 'error' && (
                    <p className="font-sans text-sm text-text-muted">
                      Erreur d&apos;envoi. Essayez kachikatib@gmail.com directement.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </SectionShell>
  )
}
