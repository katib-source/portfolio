'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'

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
  github?: string
  metricLabel?: string
  metricValue?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 'project-riviera-insight',
    title: 'RivieraInsight',
    description:
      'Outil d\'intelligence concurrentielle NLP pour les operateurs touristiques de la Cote d\'Azur. Analyse les avis TripAdvisor via CamemBERT et KeyBERT. Concu pour AzurEscape.',
    stack: ['Python', 'FastAPI', 'Next.js', 'CamemBERT', 'KeyBERT', 'Playwright'],
    status: 'Deploye',
    link: 'https://riviera-insight.vercel.app',
    linkLabel: 'Live',
    github: 'https://github.com/katib-source/riviera-insight',
    featured: true,
  },
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

function RivieraInsightPreview() {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 space-y-3 text-xs font-sans">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-text-primary uppercase tracking-[0.08em] text-[10px]">Analyse NLP — Exemple de sortie</span>
        <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] text-primary font-medium">TripAdvisor · Nice</span>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-semibold">Mots-cles dominants</p>
        <div className="flex flex-wrap gap-1.5">
          {['vue mer', 'emplacement', 'service', 'petit-dejeuner', 'proprete'].map((kw) => (
            <span key={kw} className="rounded-full bg-primary-light px-2 py-0.5 text-primary">{kw}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Avis analyses', value: '1 240' },
          { label: 'Sentiment positif', value: '74%' },
          { label: 'Concurrents suivis', value: '8' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-md border border-border bg-surface-white px-2 py-2 text-center">
            <p className="text-base font-bold text-primary">{stat.value}</p>
            <p className="text-[10px] text-text-muted leading-tight mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-border bg-surface-white px-3 py-2 flex items-center justify-between">
        <span className="text-text-secondary">Hotel Beau Rivage <span className="text-text-muted">(concurrent #1)</span></span>
        <span className="font-semibold text-primary">Score 4.3 / 5</span>
      </div>
    </div>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
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
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-primary hover:underline"
        >
          GitHub
          <Github className="h-4 w-4" />
        </a>
      )}
    </div>
  )
}

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

                {project.id === 'project-riviera-insight' && <RivieraInsightPreview />}

                <p className="font-sans text-sm leading-relaxed text-text-secondary">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Badge key={`${project.id}-${item}`}>{item}</Badge>
                  ))}
                </div>

                <ProjectLinks project={project} />
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

                <ProjectLinks project={project} />
              </article>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}
