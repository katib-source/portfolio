'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { BentoCard, Meta, SectionTag } from '@/components/ui/bento-card'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { ProjectDetailModal, type ProjectData } from './ProjectDetailModal'
import { SectionShell } from './SectionShell'

const projectsData: ProjectData[] = [
  {
    id: 'hotel-cancellation-prediction',
    title: 'Hotel Booking Cancellation Prediction',
    subtitle: 'Applied ML for operational decision support',
    description:
      'CatBoost pipeline for cancellation risk scoring with interpretable features and actionable confidence outputs.',
    features: [
      'Feature engineering around lead time, deposits, and market segments',
      'Threshold tuning for practical business recall targets',
      'Interpretability layer for staff decision confidence',
    ],
    stack: ['Python', 'CatBoost', 'pandas', 'scikit-learn'],
    status: 'shipped',
    timeline: '2025',
    role: 'ML Engineer',
    github: 'https://github.com/katib-source/hotel-fraud-model',
    metrics: [
      { label: 'auc_roc', value: '0.95' },
      { label: 'focus', value: 'high recall' },
      { label: 'impact', value: 'risk triage' },
    ],
  },
  {
    id: 'reflexa-app',
    title: 'Reflexa Mobile App',
    subtitle: 'AI-powered cross-platform product',
    description:
      'React Native application integrating text analysis and behavior signal features with privacy-first API design.',
    features: ['Cross-platform delivery', 'AI-assisted workflows', 'Privacy-aware architecture'],
    stack: ['React Native', 'JavaScript', 'Node.js', 'REST'],
    status: 'in-progress',
    timeline: '2025 - present',
    role: 'Full-Stack / AI Developer',
    github: 'https://github.com/katib-source',
    metrics: [
      { label: 'platforms', value: 'android + ios' },
      { label: 'cycle', value: 'full lifecycle' },
    ],
  },
  {
    id: 'azurescape',
    title: 'AzurEscape Booking Platform',
    subtitle: 'Booking workflows with recommendation logic',
    description:
      'Guided-tour platform with account management, reservation engine, and preference-based recommendations.',
    stack: ['JavaScript', 'Node.js', 'Database'],
    status: 'shipped',
    timeline: '2024 - 2025',
    role: 'Web/Data Developer',
    github: 'https://github.com/katib-source/Riviera-Trails',
    metrics: [
      { label: 'scope', value: 'booking + users' },
      { label: 'ai', value: 'recommendations' },
    ],
  },
  {
    id: 'mario-2d-engine',
    title: '2D Mario Engine',
    subtitle: 'Reusable platformer architecture',
    description:
      'Entity-style architecture, collision system, level loop, and extensible mechanics for 2D gameplay systems.',
    stack: ['Java', 'LibGDX', 'Game Loop'],
    status: 'archived',
    timeline: '2024',
    role: 'Engine Developer',
    github: 'https://github.com/katib-source/mario-2d-engine.git',
  },
]

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)

  const featuredProjects = projectsData.slice(0, 3)
  const otherProjects = projectsData.slice(3)

  return (
    <>
      <SectionShell id="projects" showGrid>
        <div className="mb-8">
          <SectionTag id="03" label="Projects" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
        >
          <BentoGrid gap="md" colsDesktop={12} className="md:grid-cols-12">
            {featuredProjects.map((project, index) => (
              <BentoGridItem
                key={project.id}
                colSpan={12}
                colSpanMd={12}
                colSpanLg={index === 0 ? 12 : index === 1 ? 4 : 8}
              >
                <BentoCard
                  index={index}
                  interactive
                  fullHeight
                  className="group min-w-0 cursor-pointer space-y-5"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-center justify-between">
                    <Meta prefix="#">{project.id}</Meta>
                    <Meta prefix="#">featured</Meta>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-zinc-100">{project.title}</h3>
                    {project.subtitle && <Meta>{project.subtitle}</Meta>}
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Meta prefix="~">tech</Meta>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                    <Meta>{project.timeline ?? 'ongoing'}</Meta>
                    <span className="inline-flex items-center gap-2 text-xs text-zinc-400 transition-colors group-hover:text-[#00FF9F]">
                      open_spec
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </BentoCard>
              </BentoGridItem>
            ))}
          </BentoGrid>
        </motion.div>

        {otherProjects.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-48px' }}
            className="mt-12"
          >
            <Meta prefix="#">additional</Meta>
            <BentoGrid gap="md" colsDesktop={12} className="mt-4 md:grid-cols-12">
              {otherProjects.map((project, index) => (
                <BentoGridItem key={project.id} colSpan={12} colSpanMd={6} colSpanLg={4}>
                  <motion.div variants={fadeUp} custom={index}>
                    <BentoCard
                      index={index + featuredProjects.length}
                      interactive
                      fullHeight
                      className="group min-w-0 cursor-pointer space-y-4"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Meta prefix="#">{project.id}</Meta>
                      <Meta prefix="~">tech</Meta>
                      <h4 className="text-base font-medium text-zinc-100">{project.title}</h4>
                      <p className="line-clamp-3 text-sm text-zinc-400">{project.description}</p>
                      <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                        <Meta>{project.status}</Meta>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-1 text-zinc-500 hover:text-[#00FF9F]"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </BentoCard>
                  </motion.div>
                </BentoGridItem>
              ))}
            </BentoGrid>
          </motion.div>
        )}
      </SectionShell>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
