'use client'

import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const experience = [
  {
    title: 'Réceptionniste – Support Informatique & Data',
    company: 'Hotel',
    period: '2025 (≈ 1 year)',
    location: 'France',
    highlights: [
      'Managed reservations, payments, and customer data systems',
      'Analyzed real booking data to identify business issues (cancellations, refused payments, fraud)',
      'Collaborated with operations team to improve processes',
      'Maintained strict data confidentiality and protection standards',
    ],
  },
  {
    title: 'Développeur IA & Mobile',
    company: 'Reflexa App (Personal Project)',
    period: '2025–present',
    location: 'France',
    highlights: [
      'Built React Native cross-platform app (Android/iOS)',
      'Implemented AI features: text analysis, classification, behavioral pattern detection',
      'Developed custom APIs for AI service communication',
      'Applied ethics and privacy principles throughout development',
    ],
  },
  {
    title: 'Freelance – Web & Data',
    company: 'AzurEscape',
    period: '2024–2025 (1 year)',
    location: 'France',
    highlights: [
      'Developed guided-tour booking platform with reservation and user management',
      'Implemented data analysis for user preference insights',
      'Built personalized recommendation features',
    ],
  },
  {
    title: 'Web Development Intern',
    company: 'Takaful',
    period: '2023 (6 months)',
    location: 'Algeria',
    highlights: [
      'Frontend development with HTML, CSS, JavaScript, and Bootstrap',
      'Backend application logic and database operations',
      'CRUD functionality, testing, and debugging',
      'Collaborated with team on optimization tasks',
    ],
  },
]

const education = [
  {
    degree: 'Licence 3 Informatique',
    school: 'Université Côte d\'Azur',
    period: '2024 – Present',
    location: 'Nice, France',
    focus: 'Algorithmique, Bases de données, IA & ML, Systèmes/Linux, Réseaux, Développement Web',
  },
  {
    degree: 'Classe Préparatoire Informatique',
    school: 'École Supérieure d\'Informatique',
    period: '2022 – 2024',
    location: 'Algérie',
    focus: 'Analyse mathématique, Algèbre, Probabilités & Statistiques, Algorithmique, Programmation',
  },
]

export function ResumeSection() {
  return (
    <section id="resume" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                Resume
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Professional experience and academic background.
              </p>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              asChild
            >
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-medium mb-6">Experience</h3>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <motion.div
                  key={`${job.company}-${job.title}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div>
                          <h4 className="font-semibold">{job.title}</h4>
                          <p className="text-sm text-primary">{job.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{job.period}</p>
                          <p className="text-xs text-muted-foreground">{job.location}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {job.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Resume Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Education */}
            <div>
              <h3 className="text-lg font-medium mb-6">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <Card key={`${edu.degree}-${edu.school}`} className="border-border/50">
                    <CardContent className="p-5">
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-sm text-primary">{edu.school}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">{edu.period}</p>
                        <p className="text-xs text-muted-foreground">{edu.location}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{edu.focus}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Resume Preview */}
            <div>
              <h3 className="text-lg font-medium mb-4">Quick View</h3>
              <Card className="border-border/50 overflow-hidden group cursor-pointer"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <div className="aspect-[8.5/11] bg-muted/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4/5 space-y-3">
                      <div className="h-3 bg-foreground/20 rounded w-1/2" />
                      <div className="h-2 bg-muted-foreground/20 rounded w-full" />
                      <div className="h-2 bg-muted-foreground/20 rounded w-3/4" />
                      <div className="h-2 bg-muted-foreground/10 rounded w-full mt-4" />
                      <div className="h-2 bg-muted-foreground/10 rounded w-5/6" />
                      <div className="h-2 bg-muted-foreground/10 rounded w-2/3" />
                      <div className="h-2 bg-muted-foreground/10 rounded w-full mt-4" />
                      <div className="h-2 bg-muted-foreground/10 rounded w-4/5" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-background/90 rounded-lg p-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Open PDF</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
