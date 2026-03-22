'use client'

import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { SectionShell } from './SectionShell'

export function ResumeSection() {
  return (
    <SectionShell id="resume" tone="muted">
      <div className="mb-8">
        <SectionHeader id="resume-heading" title="RESUME" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
      >
        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div variants={fadeUp} custom={0} className="lg:col-span-8">
            <Card className="space-y-4 bg-surface-white">
              <p className="font-sans text-sm font-semibold text-primary">Profil</p>
              <h3 className="font-sans text-2xl font-semibold text-text-primary">
                Profil data science et IA oriente impact produit.
              </h3>
              <p className="font-sans text-sm leading-relaxed text-text-secondary">
                CV complet avec experiences, projets, competences techniques et parcours academique,
                en coherence avec les objectifs d&apos;alternance.
              </p>
              <div className="flex flex-wrap gap-4 border-t border-border pt-4 font-sans text-sm text-text-muted">
                <span>Format: PDF</span>
                <span>Mise a jour: 2026</span>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="lg:col-span-4">
            <Card className="space-y-3 bg-surface-white">
              <p className="font-sans text-sm font-semibold text-primary">Actions</p>
              <a
                href="/resume.pdf"
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <Download className="h-4 w-4" />
                Telecharger mon CV
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-4 py-3 font-sans text-sm font-semibold text-primary transition-colors hover:bg-primary-light"
              >
                <FileText className="h-4 w-4" />
                Ouvrir le PDF
              </a>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </SectionShell>
  )
}
