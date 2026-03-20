'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Award } from 'lucide-react'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { BentoCard, Meta, SectionTag } from '@/components/ui/bento-card'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { SectionShell } from './SectionShell'

type CertificationItem = {
  id: string
  title: string
  issuer: string
  date: string
  badge?: string
  href?: string
}

const certifications: CertificationItem[] = [
  {
    id: 'cert-01',
    title: 'Supervised Learning with scikit-learn',
    issuer: 'DataCamp',
    date: '2026-03-14',
    badge: 'completed',
    href: '/certificates/supervised-scikit-learn.png',
  },
  {
    id: 'cert-02',
    title: 'Intermediate Deep Learning with PyTorch',
    issuer: 'DataCamp',
    date: '2026-03-14',
    badge: 'completed',
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
    <SectionShell id="certifications" showGrid>
      <div className="mb-8">
        <SectionTag id="02" label="Certifications" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
      >
        <BentoGrid gap="md" colsDesktop={12}>
          {certifications.map((certificate, index) => (
            <BentoGridItem key={certificate.id} colSpan={12} colSpanMd={6} colSpanLg={4}>
              <motion.div variants={fadeUp} custom={index}>
                <BentoCard index={index} span="col-span-12" className="space-y-4" interactive>
                  <div className="flex items-center justify-between">
                    <Meta prefix="#">{certificate.id}</Meta>
                    {certificate.badge && (
                      <span className="inline-flex items-center gap-1 border border-zinc-800 bg-zinc-900 px-2 py-1 font-mono text-[10px] text-zinc-300">
                        <Award className="h-3 w-3 text-zinc-400" />
                        {certificate.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-zinc-100">{certificate.title}</h3>
                  <Meta>{certificate.issuer}</Meta>
                  <Meta>{certificate.date}</Meta>
                  {certificate.href && (
                    <a
                      href={certificate.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-zinc-800 px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-[#00FF9F] hover:text-[#00FF9F]"
                    >
                      view_certificate
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </BentoCard>
              </motion.div>
            </BentoGridItem>
          ))}
        </BentoGrid>
      </motion.div>
    </SectionShell>
  )
}
