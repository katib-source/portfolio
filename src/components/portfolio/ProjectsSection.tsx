'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProjectDetailModal, type Project } from './ProjectDetailModal'

const projectsData: Project[] = [
  {
    id: 'hotel-cancellation-prediction',
    title: 'Hotel Booking Cancellation Prediction',
    problem: 'Predicting booking cancellations to reduce revenue loss and enable proactive intervention strategies',
    description: 'A machine learning model using CatBoost to predict hotel booking cancellations based on reservation features, achieving ≈0.95 AUC-ROC with interpretable results for business decision support.',
    detailedDescription: 'Developed a production-ready cancellation prediction system using CatBoost on structured hotel booking data. The pipeline encompasses data cleaning, feature engineering, encoding categorical variables, and handling missing values. Key predictive features include lead time, deposit type, market segment, and client history. The model outputs both predictions and feature importance scores, enabling hotel staff to understand risk factors and take targeted actions such as verification calls or adjusted deposit policies.',
    techStack: ['Python', 'CatBoost', 'pandas', 'NumPy', 'scikit-learn', 'Jupyter'],
    metrics: {
      'AUC-ROC': '≈0.95',
      'Recall': 'High',
      'Impact': 'Decision support'
    },
    features: [
      'Data preprocessing pipeline for real-world hotel data',
      'Feature engineering from booking attributes',
      'CatBoost gradient boosting model training',
      'Precision/recall evaluation and threshold optimization',
      'Feature importance analysis for interpretability',
    ],
    challenges: [
      'Handling class imbalance in cancellation data',
      'Encoding complex categorical features with many levels',
      'Balancing model performance with interpretability for business stakeholders',
    ],
    learnings: [
      'Practical application of gradient boosting on tabular data',
      'Importance of domain knowledge in feature engineering',
      'Translating model outputs into actionable business recommendations',
    ],
    image: '/projects/hotel-ml.png',
    github: 'https://github.com/katib-source/hotel-fraud-model',
    demo: null,
    featured: true,
  },
  {
    id: 'reflexa-app',
    title: 'Reflexa App — AI-Powered Mobile Application',
    problem: 'Building a cross-platform mobile application with integrated AI capabilities while maintaining privacy and ethical data handling',
    description: 'A React Native mobile application featuring AI-powered text analysis, classification, and behavioral pattern detection with custom API development for AI service integration.',
    detailedDescription: 'Designed and developed a cross-platform mobile application (Android/iOS) using React Native. The app integrates multiple AI features including text analysis, intelligent classification, and behavioral pattern detection. Built custom APIs to communicate with AI services while implementing strict privacy and data protection measures. The project follows a full development lifecycle from design through continuous improvement, with emphasis on ethical AI practices and user privacy.',
    techStack: ['React Native', 'JavaScript', 'Node.js', 'REST APIs', 'AI Services'],
    metrics: {
      'Platforms': 'Android/iOS',
      'Duration': '2025–present',
      'Cycle': 'Full lifecycle'
    },
    features: [
      'Cross-platform mobile development for Android and iOS',
      'AI-powered text analysis and classification features',
      'Behavioral pattern detection algorithms',
      'Custom API development for AI service communication',
      'Privacy-first architecture with ethical data handling',
    ],
    challenges: [
      'Integrating AI services efficiently in mobile environments',
      'Maintaining performance while processing complex AI tasks',
      'Implementing privacy-preserving architecture',
    ],
    learnings: [
      'Mobile-first AI integration patterns',
      'Balancing feature richness with app performance',
      'Ethical considerations in AI application development',
    ],
    image: '/projects/reflexa.png',
    github: 'https://github.com/katib-source',
    demo: null,
    featured: true,
  },
  {
    id: 'azurescape',
    title: 'AzurEscape — Booking Platform with AI Features',
    problem: 'Creating a guided-tour booking platform with personalized recommendations through data analysis',
    description: 'A web platform for guided-tour bookings featuring reservation management, user management, and AI-powered preference analysis for personalized recommendations.',
    detailedDescription: 'Developed a comprehensive booking platform for guided tours in the French Riviera region. The system manages reservations, user accounts, and customer databases. Implemented data analysis features to understand user preferences and generate personalized tour recommendations. The platform integrates booking workflows with backend data processing to deliver a seamless user experience while collecting valuable business intelligence.',
    techStack: ['JavaScript', 'HTML/CSS', 'Node.js', 'Database', 'Data Analysis'],
    metrics: {
      'Features': 'Booking + Users',
      'AI': 'Recommendations',
      'Duration': '1 year'
    },
    features: [
      'Reservation and booking management system',
      'User account management and authentication',
      'Customer database with structured data storage',
      'Preference analysis from user behavior',
      'Personalized tour recommendation engine',
    ],
    challenges: [
      'Designing a scalable booking workflow',
      'Implementing effective recommendation algorithms',
      'Balancing data collection with user experience',
    ],
    learnings: [
      'Full-stack web development for real business needs',
      'Data-driven feature implementation',
      'Customer-centric design in booking systems',
    ],
    image: '/projects/azurescape.png',
    github: 'https://github.com/katib-source/Riviera-Trails',
    demo: null,
    featured: true,
  },
  {
    id: 'takaful-internship',
    title: 'Takaful — Web Development Internship',
    problem: 'Contributing to enterprise web applications through frontend and backend development with database integration',
    description: 'A 6-month internship developing web applications with HTML/CSS/JavaScript frontend, backend logic, database operations, and testing/debugging workflows.',
    detailedDescription: 'Completed a structured internship at Takaful (Algeria), working on enterprise web applications. Responsibilities included frontend development using HTML, CSS, JavaScript, and Bootstrap; backend application logic implementation; database design and operations; CRUD functionality development; comprehensive testing and debugging; and performance optimization. Gained practical experience in collaborative software development and professional coding standards.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Database'],
    metrics: {
      'Duration': '6 months',
      'Scope': 'Frontend + Backend',
      'Team': 'Collaborative'
    },
    features: [
      'Frontend development with responsive design',
      'Backend application logic and business rules',
      'Database operations and query optimization',
      'CRUD functionality and form handling',
      'Testing, debugging, and performance optimization',
    ],
    challenges: [
      'Adapting to professional development standards',
      'Integrating frontend and backend components',
      'Working effectively in a team environment',
    ],
    learnings: [
      'Professional software development workflows',
      'Best practices in web application architecture',
      'Collaborative development and code review processes',
    ],
    image: '/projects/takaful.png',
    github: 'https://github.com/katib-source/takaful',
    demo: null,
    featured: false,
  },
  {
    id: 'mario-2d-engine',
    title: '2D Mario Game Engine',
    problem: 'Building a reusable 2D platformer game engine from scratch with clean architecture and extensible components',
    description: 'A custom 2D Mario-like game engine implementing game loop architecture, entity-component-style design, physics simulation, collision detection, and level management.',
    detailedDescription: 'Developed a 2D platformer game engine from the ground up, focusing on object-oriented design principles and real-time systems architecture. The engine implements a classic update/render game loop cycle, entity-component-style organization for game objects (player, enemies, platforms, items), AABB collision detection and resolution, and a level loading system with map management. Designed with extensibility in mind to support various 2D platformer mechanics.',
    techStack: ['Java', 'LibGDX', 'OOP', 'Game Loop', 'Collision System'],
    metrics: {
      'Architecture': 'Entity-based',
      'Loop': 'Real-time',
      'Focus': 'Extensible'
    },
    features: [
      'Game loop with update/render cycle',
      'Entity-component-style architecture for game objects',
      'AABB collision detection and resolution',
      'Level loading and map management system',
      'Input handling and player state machine',
    ],
    challenges: [
      'Implementing accurate collision detection and response',
      'Managing game state transitions and entity lifecycle',
      'Designing a clean, extensible architecture for multiple entity types',
    ],
    learnings: [
      'Low-level game mechanics and real-time system constraints',
      'Object-oriented design patterns in game development',
      'Physics simulation and collision mathematics',
    ],
    image: '/projects/mario-engine.png',
    github: 'https://github.com/katib-source/mario-2d-engine.git',
    demo: null,
    featured: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const featuredProjects = projectsData.filter(p => p.featured)
  const otherProjects = projectsData.filter(p => !p.featured)

  return (
    <>
      <section id="projects" className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Technical projects in AI, data science, and software engineering (alternance/internship focus).
            </p>
          </motion.div>

          {/* Featured Projects */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-6 md:gap-8 mb-16"
          >
            {featuredProjects.map((project, index) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card 
                  className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-0">
                    <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                      {/* Project Info */}
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground italic">
                              {project.problem}
                            </p>
                          </div>
                          
                          <p className="text-sm text-muted-foreground/90 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <Badge 
                                key={tech} 
                                variant="secondary"
                                className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 border-0"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            {Object.entries(project.metrics).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <p className="text-sm font-semibold text-foreground">{value}</p>
                                <p className="text-xs text-muted-foreground capitalize">{key}</p>
                              </div>
                            ))}
                          </div>

                          {/* Links */}
                          <div className="flex items-center gap-3 pt-2">
                            {project.github && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  window.open(project.github!, '_blank')
                                }}
                              >
                                <Github className="h-4 w-4 mr-2" />
                                Code
                              </Button>
                            )}
                            {project.demo && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  window.open(project.demo!, '_blank')
                                }}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Demo
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Project Image */}
                      <div className="relative aspect-[4/3] md:aspect-auto bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50" />
                        <div className="relative z-10 w-4/5 h-4/5 bg-card rounded-lg shadow-xl border border-border/50 flex items-center justify-center">
                          <div className="text-center p-6">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                              <CodeIcon className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground font-mono">{project.id}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Other Projects Grid */}
          {otherProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-medium text-muted-foreground mb-6">
                Additional Experience
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className="border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold tracking-tight group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <Badge 
                              key={tech} 
                              variant="secondary"
                              className="text-xs font-medium bg-primary/10 text-primary border-0"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.techStack.length > 3 && (
                            <Badge 
                              variant="secondary"
                              className="text-xs font-medium bg-muted text-muted-foreground border-0"
                            >
                              +{project.techStack.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          {project.github ? (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(project.github!, '_blank')
                              }}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Github className="h-4 w-4" />
                            </button>
                          ) : (
                            <div />
                          )}
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        open={selectedProject !== null}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </>
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
