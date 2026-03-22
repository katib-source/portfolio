'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail, Phone } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motion'

function scrollToSection(sectionId: string) {
  const element = document.querySelector(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-surface" />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="absolute -left-[10%] -top-[20%] h-[70%] w-[60%] rounded-full opacity-30 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #3E5F9D 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="absolute -bottom-[10%] -right-[10%] h-[60%] w-[50%] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #6B8CC7 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="absolute right-[20%] top-[30%] h-[50%] w-[40%] rounded-full opacity-[0.15] blur-[80px]"
          style={{ background: 'radial-gradient(circle, #E8EDF5 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-surface/80 to-surface" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8 lg:col-span-8"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="font-sans text-xs font-semibold tracking-[0.08em] text-primary md:text-sm"
          >
            ✦ Portfolio
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-display text-3xl font-bold leading-tight text-[--text-primary] md:text-5xl"
          >
            Katib Kachi
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-sans text-lg text-text-secondary"
          >
            Etudiant en L3 Informatique · Alternance Data Science / IA
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="max-w-3xl font-sans text-base leading-relaxed text-text-secondary"
          >
            J&apos;applique les methodes de data science et de machine learning sur des projets concrets,
            avec une approche rigoureuse orientee impact, clarte et mise en production.
          </motion.p>

          <motion.div variants={fadeUp} custom={4} className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => scrollToSection('#projects')}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 font-sans text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-dark"
            >
              Voir mes projets
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="/resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-primary px-6 font-sans text-sm font-semibold text-primary transition-colors duration-300 hover:bg-primary-light"
            >
              Telecharger mon CV
              <Download className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={5}
            className="flex flex-col gap-3 rounded-lg bg-primary px-5 py-4 text-surface-white md:flex-row md:items-center md:justify-between"
          >
            <a
              href="mailto:kachikatib@gmail.com"
              className="inline-flex items-center gap-2 font-sans text-sm hover:underline"
            >
              <Mail className="h-4 w-4" />
              kachikatib@gmail.com
            </a>
            <p className="inline-flex items-center gap-2 font-sans text-sm">
              <Phone className="h-4 w-4" />
              Telephone disponible sur demande
            </p>
            <a
              href="https://www.katib.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm hover:underline"
            >
              <ArrowRight className="h-4 w-4" />
              www.katib.me
            </a>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="hidden lg:col-span-4 lg:block">
          <div className="rounded-lg border border-border bg-surface-white p-4 shadow-sm">
            <Image
              src="/katib.png"
              alt="Katib Kachi"
              width={420}
              height={420}
              className="w-full rounded-lg object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
