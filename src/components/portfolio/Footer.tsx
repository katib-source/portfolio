'use client'

import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, transition } from '@/lib/motion'

const socialLinks = [
  { icon: Github, href: 'https://github.com/katib-source', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/katib-kachi', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:kachikatib@gmail.com', label: 'Email' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto max-w-[1400px] px-6 py-6 md:px-12 lg:px-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <motion.div variants={fadeUp} custom={0} className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
            <span className="text-sm text-zinc-200">
              <span className="text-[#00FF9F]">K</span>atib
            </span>
            <span>~built_with nextjs</span>
            <span>~copyright {currentYear}</span>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center border border-zinc-700 text-zinc-500 transition-colors hover:border-[#00FF9F] hover:text-[#00FF9F]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={transition}
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            type="button"
            variants={fadeUp}
            custom={2}
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 self-start border border-zinc-700 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-[#00FF9F] hover:text-[#00FF9F] md:self-auto"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={transition}
          >
            #top
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}
