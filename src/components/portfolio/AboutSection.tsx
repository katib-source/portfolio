'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const skills = {
  'Programming Languages': [
    { name: 'Python', level: 5 },
    { name: 'Java', level: 4 },
    { name: 'C', level: 4 },
    { name: 'JavaScript', level: 4 },
    { name: 'C++', level: 3 },
  ],
  'Frameworks & Tools': [
    { name: 'pandas/NumPy', level: 5 },
    { name: 'scikit-learn', level: 4 },
    { name: 'Jupyter', level: 5 },
    { name: 'Git/GitHub', level: 4 },
    { name: 'Linux/Bash', level: 4 },
    { name: 'Docker', level: 3 },
    { name: 'CI/CD', level: 2 },
  ],
  'Core Concepts': [
    { name: 'Machine Learning', level: 4 },
    { name: 'Data Analysis', level: 5 },
    { name: 'Predictive Modeling', level: 4 },
    { name: 'Algorithms & Data Structures', level: 4 },
    { name: 'Database Systems', level: 4 },
    { name: 'Web Development', level: 4 },
  ],
}

const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'French', level: 'C1' },
  { name: 'English', level: 'C1' },
]

const timeline = [
  {
    year: '2024–2025',
    title: 'Réceptionniste – Support Informatique & Data',
    institution: 'Hotel, France',
    description: 'Real booking data analysis, business issues (cancellations, fraud), collaboration with operations, strict data confidentiality',
  },
  {
    year: '2024',
    title: 'Licence 3 Informatique',
    institution: 'Université Côte d\'Azur, Nice',
    description: 'Key courses: Algorithmique, Bases de données, IA & ML, Systèmes/Linux, Réseaux, Développement Web',
  },
  {
    year: '2022–2024',
    title: 'Classe Préparatoire Informatique',
    institution: 'École Supérieure d\'Informatique, Algérie',
    description: 'Analyse mathématique, Algèbre, Probabilités & Statistiques, Algorithmique, Programmation impérative',
  },
  {
    year: '2025',
    title: 'Développeur IA & Mobile – Reflexa App',
    institution: 'Personal Project, France',
    description: 'React Native cross-platform app with AI features (text analysis, classification, pattern detection)',
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

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative bg-muted/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_30%,transparent_80%)]" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            About
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Academic background, technical skills, and professional experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-base leading-relaxed text-muted-foreground">
                I am a Licence 3 (L3) Computer Science student at Université Côte d&apos;Azur in Nice, France, 
                with a focus on applied machine learning and data science. My work involves predictive modeling, 
                real-world hotel data analysis, and deploying AI solutions with measurable business impact.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Through academic projects and professional experience, I have developed proficiency in 
                implementing machine learning models, analyzing complex datasets, and building data-driven 
                applications. I approach problems with analytical rigor, valuing reproducibility and practical results.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                I am currently seeking an alternance or internship position in Data Science or Artificial Intelligence 
                to apply my skills in a professional environment while continuing to grow technically.
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-12">
              <h3 className="text-lg font-medium mb-6">Experience & Education</h3>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year + item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative pl-6 border-l-2 border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary/50" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-primary">{item.year}</span>
                        <span className="text-xs text-muted-foreground">{item.institution}</span>
                      </div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-2 space-y-8"
          >
            {Object.entries(skills).map(([category, items]) => (
              <motion.div key={category} variants={itemVariants}>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  {category}
                </h3>
                <div className="space-y-3">
                  {items.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < skill.level ? 'bg-primary' : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Languages */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                Languages
              </h3>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-xs text-muted-foreground">{lang.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Qualities */}
            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                Qualities
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Autonomous',
                  'Rigorous',
                  'Curious',
                  'Analytical mindset',
                  'Problem-solving',
                  'Teamwork',
                ].map((quality) => (
                  <Badge
                    key={quality}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 border-0"
                  >
                    {quality}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
