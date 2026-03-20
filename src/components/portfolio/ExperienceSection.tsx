'use client'

import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import { BentoCard, Meta, SectionTag } from '@/components/ui/bento-card'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { SectionShell } from './SectionShell'

type ExperienceEntry = {
  id: string
  role: string
  company: string
  dates: string
  location: string
  highlights: string[]
}

const experienceEntries: ExperienceEntry[] = [
  {
    id: 'exp-01',
    role: 'AI and Mobile Developer',
    company: 'Reflexa App',
    dates: '2025 - present',
    location: 'France',
    highlights: [
      'Built cross-platform mobile workflows with AI-powered features',
      'Implemented text analysis and behavior signal processing',
      'Integrated privacy-aware APIs for production-like usage',
    ],
  },
  {
    id: 'exp-02',
    role: 'Freelance Web and Data Developer',
    company: 'AzurEscape',
    dates: '2024 - 2025',
    location: 'France',
    highlights: [
      'Shipped booking and account management workflows',
      'Built recommendation features from user preference data',
      'Maintained product quality through iterative releases',
    ],
  },
  {
    id: 'exp-03',
    role: 'Web Development Intern',
    company: 'Takaful',
    dates: '2023',
    location: 'Algeria',
    highlights: [
      'Delivered frontend and backend features with database operations',
      'Handled CRUD flows, testing, and debugging tasks',
      'Collaborated within team engineering workflows',
    ],
  },
]

export function ExperienceSection() {
  return (
    <SectionShell id="experience" showGrid>
      <div className="mb-8">
        <SectionTag id="04" label="Experience" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
        className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="relative pl-8">
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-zinc-800" />
          <div className="space-y-7">
            {experienceEntries.map((entry, index) => (
              <motion.article key={entry.id} variants={fadeUp} custom={index} className="relative space-y-3">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.05rem] top-2 h-2 w-2 bg-[#00FF9F]"
                />
                <Meta prefix="#">{entry.id}</Meta>
                <Meta prefix="#">role</Meta>
                <h3 className="text-xl font-medium text-zinc-100">{entry.role}</h3>
                <Meta prefix="#">company</Meta>
                <p className="text-sm text-zinc-300">{entry.company}</p>
                <div className="flex flex-wrap gap-4">
                  <Meta>{entry.dates}</Meta>
                  <Meta>{entry.location}</Meta>
                </div>
                <ul className="space-y-2 border-l border-zinc-800 pl-4">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm leading-relaxed text-zinc-400">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div variants={fadeUp} custom={3} className="space-y-6">
          <BentoCard index={0} span="col-span-12" className="space-y-4">
            <Meta prefix="#">resume</Meta>
            <p className="text-sm leading-relaxed text-zinc-400">
              Full technical resume with projects, delivery outcomes, coursework, and core competencies.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 border border-zinc-700 px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-zinc-200 hover:border-[#00FF9F] hover:text-[#00FF9F]"
              >
                <Download className="h-3.5 w-3.5" />
                download_resume
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-zinc-700 px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400 hover:border-[#00FF9F] hover:text-[#00FF9F]"
              >
                <FileText className="h-3.5 w-3.5" />
                open_pdf
              </a>
            </div>
          </BentoCard>
        </motion.div>
      </motion.div>
    </SectionShell>
  )
}
