'use client'

import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import { BentoGrid } from '@/components/ui/bento-grid'
import { BentoCard, Meta, SectionTag } from '@/components/ui/bento-card'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { SectionShell } from './SectionShell'

export function ResumeSection() {
  return (
    <SectionShell id="resume" tone="muted" showGrid>
      <div className="mb-8">
        <SectionTag id="06" label="Resume" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
      >
        <BentoGrid gap="sm" colsDesktop={12} className="md:grid-cols-1 lg:grid-cols-12 lg:gap-6">
          <BentoCard span="col-span-12 lg:col-span-8" index={0} className="space-y-4">
            <Meta prefix="#">profile</Meta>
            <h3 className="text-2xl font-light text-zinc-100">Production-minded AI and software engineer.</h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              Resume includes technical projects, internship and freelance contributions, and academic
              specialization aligned with data and machine learning roles.
            </p>
            <div className="flex flex-wrap gap-4 border-t border-zinc-800 pt-4">
              <Meta>format: pdf</Meta>
              <Meta>updated: 2026</Meta>
            </div>
          </BentoCard>

          <BentoCard span="col-span-12 lg:col-span-4" index={1} className="space-y-3">
            <Meta prefix="#">actions</Meta>
            <a
              href="/resume.pdf"
              download
              className="inline-flex w-full items-center justify-center gap-2 border border-zinc-700 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-zinc-200 hover:border-[#00FF9F] hover:text-[#00FF9F]"
            >
              <Download className="h-4 w-4" />
              download_resume
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 border border-zinc-700 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400 hover:border-[#00FF9F] hover:text-[#00FF9F]"
            >
              <FileText className="h-4 w-4" />
              open_in_new_tab
            </a>
          </BentoCard>
        </BentoGrid>
      </motion.div>
    </SectionShell>
  )
}
