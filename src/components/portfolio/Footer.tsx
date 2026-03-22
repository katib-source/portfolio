'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

import { fadeUp, staggerContainer, transition } from '@/lib/motion'

const socialLinks = [
  { icon: Github, href: 'https://github.com/katib-source', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/katib-kachi', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:kachikatib@gmail.com', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-card">
      <div className="mx-auto max-w-[1200px] px-6 py-8 md:px-12 lg:px-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <motion.p variants={fadeUp} custom={0} className="font-sans text-sm text-text-primary">
            © 2026 Katib Kachi
          </motion.p>

          <motion.div variants={fadeUp} custom={1} className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:bg-primary-light"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={transition}
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} custom={2} className="font-sans text-xs text-text-muted">
            Fait avec Next.js
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
