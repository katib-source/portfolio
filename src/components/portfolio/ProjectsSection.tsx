'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { SectionShell } from './SectionShell'

type Project = {
  id: string
  title: string
  description: string
  stack: string[]
  status?: 'Deploye' | 'En cours'
  link?: string
  linkLabel?: string
  metricLabel?: string
  metricValue?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 'project-ml-hotel',
    title: 'ML Hotel Cancellation Prediction',
    description:
      'Modele de prediction des annulations hotelieres base sur des donnees de reservation, avec approche interpretable pour aider les decisions operationnelles.',
    stack: ['Python', 'CatBoost', 'pandas', 'scikit-learn'],
    status: 'Deploye',
    metricLabel: 'AUC-ROC',
    metricValue: '0.95',
    link: 'https://github.com/katib-source/hotel-fraud-model',
    linkLabel: 'Voir le projet',
    featured: true,
  },
  {
    id: 'project-azurescape',
    title: 'AzurEscape Booking Platform',
    description:
      'Plateforme de reservation avec gestion utilisateur et flux de reservation, concue pour une experience claire et fiable cote client.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    status: 'Deploye',
    link: 'https://azurescape.fr',
    linkLabel: 'Voir le projet',
    featured: true,
  },
  {
    id: 'project-reflexa',
    title: 'Reflexa Mobile App',
    description:
      'Application mobile orientee usage reel, combinant interfaces React Native et services Node.js pour des fonctionnalites intelligentes.',
    stack: ['React Native', 'Node.js'],
    status: 'En cours',
    link: 'https://github.com/katib-source',
    linkLabel: 'Voir le projet',
    featured: true,
  },
  {
    id: 'project-takaful',
    title: 'Takaful (Projet ESI)',
    description:
      'Projet pluridisciplinaire en equipe sur la conception applicative, la logique metier et l integration de donnees.',
    stack: ['JavaScript/TypeScript', 'SQL', 'MongoDB'],
    status: 'Deploye',
    link: 'https://github.com/katib-source',
    linkLabel: 'Voir le projet',
  },
  {
    id: 'project-mario',
    title: '2D Mario Engine',
    description:
      'Moteur 2D orientee architecture de jeu, collisions et boucle de rendu, pense pour experimentation et progression technique.',
    stack: ['Java', 'LibGDX', 'Game Loop'],
    link: 'https://github.com/katib-source/mario-2d-engine.git',
    linkLabel: 'Voir le projet',
  },
]

export function ProjectsSection() {
  const featured = projects.filter((project) => project.featured)
  const secondary = projects.filter((project) => !project.featured)

  return (
    <SectionShell id="projects" className="bg-surface py-20 md:py-24" contentClassName="max-w-[1200px]">
      <div className="mb-8">
        <SectionHeader title="PROJETS" id="projects-heading" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {featured.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            custom={index}
            className={index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
          >
            <Card className="h-full bg-surface-white">
              <article className="flex h-full flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-sans text-lg font-semibold text-primary decoration-primary underline-offset-4 hover:underline">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className="mt-2 inline-flex rounded-full border border-border bg-primary-light px-2.5 py-1 font-sans text-xs text-primary">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {project.metricLabel && project.metricValue && (
                    <div className="rounded-lg border border-border bg-primary-light px-3 py-2 text-right">
                      <p className="font-sans text-[11px] uppercase tracking-[0.08em] text-text-muted">
                        {project.metricLabel}
                      </p>
                      <p className="font-sans text-2xl font-bold text-primary">{project.metricValue}</p>
                    </div>
                  )}
                </div>

                {project.id === 'project-azurescape' && (
                  <div className="rounded-lg border border-border bg-surface-card px-4 py-5">
                    <p className="font-sans text-sm text-text-muted">Capture projet</p>
                    <p className="mt-1 font-sans text-sm text-text-secondary">
                      Apercu de la plateforme AzurEscape (mockup en attente d image finale).
                    </p>
                  </div>
                )}

                <p className="font-sans text-sm leading-relaxed text-text-secondary">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Badge key={`${project.id}-${item}`}>{item}</Badge>
                  ))}
                </div>

                <div className="mt-auto pt-2">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-primary hover:underline"
                    >
                      {project.linkLabel ?? 'Voir le projet'}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-primary">
                      Voir le projet
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </article>
            </Card>
          </motion.div>
        ))}

        {secondary.map((project, index) => (
          <motion.div key={project.id} variants={fadeUp} custom={index + featured.length}>
            <Card className="h-full bg-surface-white">
              <article className="flex h-full flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-base font-semibold text-primary decoration-primary underline-offset-4 hover:underline">
                    {project.title}
                  </h3>
                  {project.status && (
                    <span className="inline-flex rounded-full border border-border bg-primary-light px-2 py-1 font-sans text-[11px] text-primary">
                      {project.status}
                    </span>
                  )}
                </div>

                <p className="font-sans text-sm leading-relaxed text-text-secondary">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Badge key={`${project.id}-${item}`}>{item}</Badge>
                  ))}
                </div>

                <div className="mt-auto pt-1">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-primary hover:underline"
                    >
                      {project.linkLabel ?? 'Voir le projet'}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-primary">
                      Voir le projet
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </article>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}
