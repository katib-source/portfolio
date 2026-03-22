'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { SectionShell } from './SectionShell'

const technicalSkills = [
  {
    label: 'Langages',
    values: ['Python', 'JavaScript/TypeScript', 'Java', 'C', 'SQL', 'HTML/CSS'],
  },
  {
    label: 'Data/IA',
    values: ['pandas', 'NumPy', 'scikit-learn', 'CatBoost', 'PyTorch'],
  },
  {
    label: 'Frameworks/Web',
    values: ['React', 'Next.js', 'Node.js'],
  },
  {
    label: 'Outils',
    values: ['Git', 'GitHub', 'Linux', 'Bash', 'Docker'],
  },
  {
    label: 'Bases de donnees',
    values: ['PostgreSQL', 'MongoDB'],
  },
]

const relationalSkills = [
  'Autonomie',
  'Rigueur',
  'Curiosite active',
  "Esprit d'analyse",
  'Communication',
  'Travail en equipe',
]

const languageLevels = [
  { name: 'Francais', level: 'Courant', progress: 90 },
  { name: 'Anglais', level: 'Courant', progress: 88 },
  { name: 'Arabe', level: 'Langue natale', progress: 100 },
]

const education = [
  {
    school: "Universite Cote d'Azur - Nice",
    degree: 'L3 Informatique',
    year: '2026',
  },
  {
    school: 'ESI-SBA - Algerie',
    degree: 'Classe Preparatoire',
    year: '2022-2024',
  },
]

export function AboutSection() {
  return (
    <SectionShell id="about" className="bg-surface py-20 md:py-24" contentClassName="max-w-[1200px]">
      <div className="mb-8">
        <SectionHeader title="About" id="about-heading" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
        className="space-y-6"
      >
        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div variants={fadeUp} custom={0} className="space-y-6 lg:col-span-5">
            <Card>
              <div className="overflow-hidden rounded-lg border border-border bg-surface-white">
                <Image
                  src="/katib.png"
                  alt="Portrait de Katib Kachi"
                  width={520}
                  height={520}
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>

            <Card>
              <h3 className="mb-5 font-sans text-base font-semibold text-primary">Education</h3>
              <div className="space-y-6">
                {education.map((item, index) => (
                  <div key={item.school} className="relative pl-7">
                    {index < education.length - 1 && (
                      <span className="absolute left-[7px] top-5 h-[calc(100%+18px)] w-px bg-primary-light" />
                    )}
                    <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-surface" />
                    <p className="font-sans text-sm font-semibold text-text-primary">{item.school}</p>
                    <p className="mt-1 font-sans text-sm text-text-secondary">{item.degree}</p>
                    <p className="mt-1 font-sans text-sm text-text-muted">{item.year}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="space-y-6 lg:col-span-7">
            <Card>
              <div className="space-y-4">
                <h3 className="font-sans text-base font-semibold text-primary">A propos</h3>
                <p className="font-sans text-base leading-relaxed text-text-secondary">
                  Etudiant en L3 Informatique a l&apos;Universite Cote d&apos;Azur, je construis des solutions data et IA
                  utiles, de la preparation des donnees jusqu&apos;a la mise en oeuvre applicative. Mon objectif est de
                  rejoindre une equipe qui valorise la rigueur technique, la collaboration et l&apos;impact concret.
                </p>
                <div className="grid gap-3 pt-1 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-surface-white px-4 py-3">
                    <p className="font-sans text-xs uppercase tracking-[0.08em] text-text-muted">Statut actuel</p>
                    <p className="mt-1 font-sans text-sm font-semibold text-primary">
                      Recherche alternance en Data Science / IA
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-surface-white px-4 py-3">
                    <p className="font-sans text-xs uppercase tracking-[0.08em] text-text-muted">Localisation</p>
                    <p className="mt-1 font-sans text-sm font-semibold text-text-primary">Nice, France</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={2} className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card>
              <h3 className="mb-5 font-sans text-base font-semibold text-primary">Competences Techniques</h3>
              <div className="space-y-4">
                {technicalSkills.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 font-sans text-sm font-semibold text-primary">{group.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.values.map((skill) => (
                        <Badge key={`${group.label}-${skill}`}>{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <Card>
              <h3 className="mb-4 font-sans text-base font-semibold text-primary">Competences Relationnelles</h3>
              <div className="flex flex-wrap gap-2">
                {relationalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-surface-white px-3 py-1 font-sans text-xs text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="mb-4 font-sans text-base font-semibold text-primary">Langues</h3>
              <div className="space-y-4">
                {languageLevels.map((language) => (
                  <div key={language.name} className="space-y-1.5">
                    <div className="flex items-center justify-between font-sans text-sm">
                      <span className="text-text-primary">{language.name}</span>
                      <span className="text-text-muted">{language.level}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-primary-light">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${language.progress}%` }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </SectionShell>
  )
}
