'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { SectionShell } from './SectionShell'

type CertificationItem = {
  id: string
  title: string
  issuer: string
  date: string
  href?: string
}

const certifications: CertificationItem[] = [
  {
    id: 'cert-01',
    title: 'Supervised Learning with scikit-learn',
    issuer: 'DataCamp',
    date: '14 mars 2026',
    href: '/certificates/supervised-scikit-learn.png',
  },
  {
    id: 'cert-02',
    title: 'Intermediate Deep Learning with PyTorch',
    issuer: 'DataCamp',
    date: '14 mars 2026',
    href: '/certificates/intermediate-pytorch.png',
  },
  {
    id: 'cert-03',
    title: 'ML Foundations Track',
    issuer: 'Portfolio Credential Set',
    date: '2026',
  },
]

export function Certifications() {
  return (
    <SectionShell id="certifications" className="bg-surface py-20 md:py-24" contentClassName="max-w-[1200px]">
      <div className="mb-8">
        <SectionHeader title="CERTIFICATIONS" id="certifications-heading" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {certifications.map((certificate, index) => (
          <motion.div key={certificate.id} variants={fadeUp} custom={index}>
            <Card className="h-full border-t-2 border-t-primary bg-surface-white">
              <article className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-between">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  <span className="font-sans text-xs text-text-muted">Verifie</span>
                </div>

                <h3 className="font-sans text-base font-semibold text-text-primary">{certificate.title}</h3>

                <div className="space-y-1">
                  <p className="font-sans text-sm text-text-secondary">{certificate.issuer}</p>
                  <p className="font-sans text-sm text-text-muted">{certificate.date}</p>
                </div>

                {certificate.href && (
                  <a
                    href={certificate.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 font-sans text-sm font-semibold text-primary hover:underline"
                  >
                    Verification
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </article>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}
