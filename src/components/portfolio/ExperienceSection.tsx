'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { SectionShell } from './SectionShell'

type ExperienceEntry = {
  id: string
  role: string
  company: string
  dates: string
  location: string
  contexte: string
  missions: string[]
  technologies: string[]
  resultats: string
  apprentissage: string
}

const experienceEntries: ExperienceEntry[] = [
  {
    id: 'exp-01',
    role: 'Receptionniste',
    company: 'Summer Hotel',
    dates: 'depuis aout 2025',
    location: 'Nice',
    contexte:
      "Accueil en environnement hotelier a forte frequentation, avec exigences de qualite de service et de reactivite sur les operations quotidiennes.",
    missions: [
      'Assurer le check-in/check-out et la coordination avec les equipes internes.',
      'Gerer les demandes clients, reservations et priorites en temps reel.',
      'Maintenir une communication professionnelle en francais, anglais et arabe.',
    ],
    technologies: ['Relation client', 'Organisation', 'Communication', 'Gestion des priorites'],
    resultats:
      'Amelioration de la fluidite front-office sur les periodes de forte affluence et maintien d une experience client stable.',
    apprentissage:
      'Renforcement de la rigueur operationnelle, de la gestion du stress et de la qualite de service.',
  },
  {
    id: 'exp-02',
    role: 'Projet ML - Prediction d annulations hotelieres',
    company: 'Projet personnel academique',
    dates: 'depuis 2025',
    location: 'Nice',
    contexte:
      "Conception d un pipeline de prediction pour anticiper les annulations et aider a la prise de decision dans un contexte de donnees reelles et bruitees.",
    missions: [
      'Nettoyer et preparer les donnees historiques de reservation.',
      'Entrainer et comparer plusieurs modeles supervises.',
      'Analyser les variables explicatives et formaliser des recommandations.',
    ],
    technologies: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'CatBoost'],
    resultats:
      'Mise en place d un modele robuste et interpretable permettant d identifier les facteurs majeurs de risque d annulation.',
    apprentissage:
      'Approfondissement de la modelisation supervisee, de l evaluation et de la communication des resultats.',
  },
  {
    id: 'exp-03',
    role: 'Organisateur - AiQuest Competition',
    company: 'AiQuest',
    dates: '2024',
    location: 'France',
    contexte:
      "Participation a l organisation d un evenement competitif autour de l IA, avec coordination d equipes et suivi des jalons.",
    missions: [
      'Contribuer a la structuration du challenge et du planning.',
      'Faciliter la communication entre participants et equipe organisatrice.',
      'Soutenir la resolution des blocages logistiques pendant l evenement.',
    ],
    technologies: ['Coordination', 'Gestion de projet', 'Communication', 'Esprit d equipe'],
    resultats:
      'Deroulement fluide de la competition avec une meilleure synchronisation des actions organisationnelles.',
    apprentissage:
      'Consolidation des competences de leadership, priorisation et collaboration.',
  },
  {
    id: 'exp-04',
    role: 'Developpeur Freelance - AzurEscape',
    company: 'AzurEscape',
    dates: 'depuis 2025',
    location: 'Nice',
    contexte:
      'Developpement de fonctionnalites web sur un projet touristique local avec objectif de livraison rapide et maintainable.',
    missions: [
      'Realiser des ecrans front-end et des APIs de support.',
      'Mettre en place des evolutions techniques selon les besoins metier.',
      'Assurer des iterations courtes avec retours utilisateurs.',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Git'],
    resultats:
      'Livraison continue de fonctionnalites prioritaires avec meilleure lisibilite du produit pour les utilisateurs finaux.',
    apprentissage:
      'Montee en competence sur la livraison produit de bout en bout et le dialogue technique-metier.',
  },
  {
    id: 'exp-05',
    role: 'Projet Pluridisciplinaire - Takaful',
    company: 'Takaful',
    dates: '2023-2024',
    location: 'Algerie',
    contexte:
      'Projet d equipe croisant developpement applicatif, modelisation des besoins et integration de base de donnees.',
    missions: [
      'Concevoir des modules fonctionnels front-end et back-end.',
      'Structurer les donnees et implementer les operations CRUD necessaires.',
      'Contribuer aux phases de test, correction et stabilisation.',
    ],
    technologies: ['JavaScript/TypeScript', 'SQL', 'MongoDB', 'GitHub', 'Bash'],
    resultats:
      'Validation d un livrable coherent et operationnel, conforme aux attentes pedagogiques et fonctionnelles.',
    apprentissage:
      'Renforcement de l autonomie technique, de la collaboration et de la methode de travail.',
  },
]

export function ExperienceSection() {
  return (
    <SectionShell id="experience" className="bg-surface py-20 md:py-24" contentClassName="max-w-[1200px]">
      <div className="mb-8">
        <SectionHeader title="EXPERIENCE" id="experience-heading" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
        className="relative pl-8 md:pl-10"
      >
        <span aria-hidden="true" className="absolute bottom-4 left-2 top-2 w-[2px] bg-primary-light md:left-3" />

        <div className="space-y-6">
          {experienceEntries.map((entry, index) => (
            <motion.div key={entry.id} variants={fadeUp} custom={index} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[30px] top-8 h-4 w-4 rounded-full border-2 border-primary bg-surface md:-left-[34px]"
              />

              <Card>
                <div className="space-y-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-sans text-lg font-semibold text-primary decoration-primary underline-offset-4 hover:underline">
                        {entry.role}
                      </h3>
                      <p className="mt-1 font-sans text-sm text-text-secondary">
                        {entry.company} - {entry.location}
                      </p>
                    </div>
                    <p className="font-sans text-sm text-text-muted">{entry.dates}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-sans text-sm font-semibold text-primary">Contexte</p>
                    <p className="font-sans text-sm leading-relaxed text-text-secondary">{entry.contexte}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-sans text-sm font-semibold text-primary">Missions</p>
                    <ul className="space-y-2">
                      {entry.missions.map((mission) => (
                        <li key={mission} className="flex items-start gap-2 font-sans text-sm leading-relaxed text-text-secondary">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{mission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="font-sans text-sm font-semibold text-primary">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.technologies.map((technology) => (
                        <Badge key={`${entry.id}-${technology}`}>{technology}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-primary-light px-4 py-3">
                    <p className="font-sans text-sm font-semibold text-primary">Resultats</p>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-text-secondary">{entry.resultats}</p>
                  </div>

                  <p className="font-sans text-sm italic text-text-muted">Apprentissage: {entry.apprentissage}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  )
}
