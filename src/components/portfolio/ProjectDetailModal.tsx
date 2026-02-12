'use client'

import { Github, ExternalLink, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface Project {
  id: string
  title: string
  problem: string
  description: string
  detailedDescription?: string
  techStack: string[]
  metrics: Record<string, string>
  features?: string[]
  challenges?: string[]
  learnings?: string[]
  image: string
  github: string | null
  demo: string | null
  featured: boolean
}

interface ProjectDetailModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0 border-border/50">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 space-y-6">
            {/* Header */}
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold tracking-tight">
                {project.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground italic">
                {project.problem}
              </p>
            </DialogHeader>

            {/* Project Image Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center overflow-hidden border border-border/50">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
              <div className="relative z-10 text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CodeIcon className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground font-mono">{project.id}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 border-0"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Overview
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.detailedDescription || project.description}
              </p>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Key Metrics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 rounded-lg border border-border/50 text-center"
                  >
                    <p className="text-lg font-semibold text-primary">{value}</p>
                    <p className="text-xs text-muted-foreground capitalize mt-1">{key}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Technical Challenges
                </h3>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Learnings */}
            {project.learnings && project.learnings.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Key Learnings
                </h3>
                <ul className="space-y-2">
                  {project.learnings.map((learning, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="text-primary mt-0.5">→</span>
                      <span className="text-muted-foreground">{learning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            {(project.github || project.demo) && (
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                {project.github && (
                  <Button
                    variant="outline"
                    className="gap-2"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
