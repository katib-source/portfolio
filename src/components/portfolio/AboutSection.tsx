'use client'

import { Code2, Briefcase, GraduationCap, Languages, MapPin, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { BentoGrid } from '@/components/ui/bento-grid'
import { BentoCard, Meta, SectionTag } from '@/components/ui/bento-card'
import { staggerContainer } from '@/lib/motion'
import { SectionShell } from './SectionShell'

const stack = ['TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'SQL', 'Pandas', 'Scikit-learn']

const languageLevels = [
  { name: 'Arabic', level: 'native' },
  { name: 'French', level: 'c1' },
  { name: 'English', level: 'c1' },
]

export function AboutSection() {
  return (
    <SectionShell id="about" tone="muted" showGrid>
      <div className="mb-8 space-y-3">
        <SectionTag id="01" label="About" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
      >
        <BentoGrid gap="sm" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <BentoCard span="col-span-1 md:col-span-2 lg:col-span-8" index={0} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex h-7 w-7 items-center justify-center border border-zinc-700">
                <User className="h-4 w-4 text-zinc-400" />
              </div>
              <Meta prefix="#">bio</Meta>
            </div>
            <h3 className="max-w-2xl text-2xl font-light text-zinc-100">
              Engineer who ships products, not just prototypes.
            </h3>
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-400">
              I build practical AI and data products from raw datasets to user-facing features. My focus is
              production reliability, measurable impact, and clear delivery in collaborative teams.
            </p>
            <div className="flex flex-wrap items-center gap-4 border-t border-zinc-800 pt-4">
              <span className="inline-flex items-center gap-2 text-zinc-400">
                <MapPin className="h-4 w-4" />
                <Meta>Nice, France</Meta>
              </span>
              <span className="inline-flex items-center gap-2 text-zinc-400">
                <GraduationCap className="h-4 w-4" />
                <Meta>Computer Science, UCA</Meta>
              </span>
            </div>
          </BentoCard>

          <BentoCard span="col-span-1 md:col-span-2 lg:col-span-4" index={1} className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex h-7 w-7 items-center justify-center border border-zinc-700">
                <Briefcase className="h-4 w-4 text-zinc-400" />
              </div>
              <Meta prefix="#">status</Meta>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-2">
                <Meta>availability</Meta>
                <span className="inline-flex items-center gap-2 text-zinc-200">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FF9F]" />
                  Open
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-2">
                <Meta>focus</Meta>
                <span className="text-right text-zinc-300">AI Engineering</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-2">
                <Meta>looking_for</Meta>
                <span className="text-right text-zinc-300">Internship / Alternance</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <Meta>location</Meta>
                <span className="text-right text-zinc-300">France / Remote</span>
              </div>
            </div>
          </BentoCard>

          <BentoCard span="col-span-1 md:col-span-1 lg:col-span-4" index={2} className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex h-7 w-7 items-center justify-center border border-zinc-700">
                <GraduationCap className="h-4 w-4 text-zinc-400" />
              </div>
              <Meta prefix="#">education</Meta>
            </div>
            <div className="space-y-4 border-l border-zinc-800 pl-4">
              <div className="space-y-1">
                <p className="text-sm text-zinc-200">Universite Cote d&apos;Azur</p>
                <Meta>computer_science</Meta>
                <Meta>2022 - present</Meta>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-zinc-200">Data and AI Track</p>
                <Meta>ml_systems</Meta>
                <Meta>specialization</Meta>
              </div>
            </div>
          </BentoCard>

          <BentoCard span="col-span-1 md:col-span-1 lg:col-span-4" index={3} className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex h-7 w-7 items-center justify-center border border-zinc-700">
                <Code2 className="h-4 w-4 text-zinc-400" />
              </div>
              <Meta prefix="#">stack</Meta>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.map((skill) => (
                <span
                  key={skill}
                  className="border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </BentoCard>

          <BentoCard span="col-span-1 md:col-span-2 lg:col-span-4" index={4} className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex h-7 w-7 items-center justify-center border border-zinc-700">
                <Languages className="h-4 w-4 text-zinc-400" />
              </div>
              <Meta prefix="#">languages</Meta>
            </div>
            <div className="space-y-3">
              {languageLevels.map((language) => (
                <div key={language.name} className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-sm text-zinc-200">{language.name}</span>
                  <Meta>{language.level}</Meta>
                </div>
              ))}
            </div>
          </BentoCard>
        </BentoGrid>
      </motion.div>
    </SectionShell>
  )
}
