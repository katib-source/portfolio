import type { Locale, Status } from "@/lib/types";

const en = {
  nav_projects: "Projects",
  nav_about: "About",
  talk: "Let's talk",
  eyebrow: "DATA SCIENCE & AI · NICE, FRANCE",
  head1: "Serious about",
  head2: "messy data",
  quip: "Quite seriously.",
  sub: "Master 1 AI student at Université Côte d'Azur. Looking for an apprenticeship.",
  cta: "See the projects",
  now_label: "CURRENTLY",
  plot_label:
    "Interactive scatter plot. Scattered points settle into two clean clusters, split by a decision boundary.",
  plot_hint: "Run your cursor through the points to add noise. They sort themselves out.",
  plot_noise: "Add noise",
  plot_clean: "Clean it",
  featured: "Read the case study",
  work_title: "More work",
  toolbox_title: "Tools I reach for",
  next_label: "Next project",
  certs: "CERTIFICATIONS",
  certs_btn: "Certs",
  close: "Close",
  back: "All projects",
  visit: "Visit project",
    labels: ["PROBLEM", "DATA", "APPROACH", "RESULT"],
  about_head1: "I build data & AI tools,",
  about_head2: "from raw data to production.",
  about_body:
    "Master 1 AI student at Université Côte d'Azur, previously prep school at ESI-SBA. I am looking for an apprenticeship with a team that values technical rigour, collaboration and real impact.",
  meta_title: "Katib Kachi | Data Science & AI portfolio",
  meta_desc:
    "Master 1 AI student at Université Côte d'Azur building data and AI tools, from raw data to production. Looking for a Data Science / AI apprenticeship.",
  not_found: "This page wandered off.",
  status: {
    SHIPPED: "SHIPPED",
    "IN PROGRESS": "IN PROGRESS",
    TEAM: "TEAM",
    ARCHIVE: "ARCHIVE",
  } satisfies Record<Status, string>,
};

export type Dictionary = typeof en;

const fr: Dictionary = {
  nav_projects: "Projets",
  nav_about: "À propos",
  talk: "On en parle",
  eyebrow: "DATA SCIENCE & IA · NICE, FRANCE",
  head1: "Du sérieux sur",
  head2: "des données sales",
  quip: "Très sérieusement.",
  sub: "Étudiant en Master 1 IA à l'Université Côte d'Azur. Je cherche une alternance.",
  cta: "Voir les projets",
  now_label: "EN CE MOMENT",
  plot_label:
    "Nuage de points interactif. Des points éparpillés se rangent en deux groupes nets, séparés par une frontière de décision.",
  plot_hint: "Passez le curseur dans les points pour ajouter du bruit. Ils se rangent tout seuls.",
  plot_noise: "Ajouter du bruit",
  plot_clean: "Nettoyer",
  featured: "Lire l'étude de cas",
  work_title: "Autres projets",
  toolbox_title: "Mes outils",
  next_label: "Projet suivant",
  certs: "CERTIFICATIONS",
  certs_btn: "Certifs",
  close: "Fermer",
  back: "Tous les projets",
  visit: "Voir le projet",
    labels: ["PROBLÈME", "DONNÉES", "APPROCHE", "RÉSULTAT"],
  about_head1: "Je construis des outils data & IA,",
  about_head2: "de la donnée brute à la production.",
  about_body:
    "Étudiant en Master 1 IA à l'Université Côte d'Azur, après une classe préparatoire à l'ESI-SBA. Je cherche une alternance dans une équipe qui valorise la rigueur technique, la collaboration et l'impact concret.",
  meta_title: "Katib Kachi | Portfolio Data Science & IA",
  meta_desc:
    "Étudiant en Master 1 IA à l'Université Côte d'Azur, je construis des outils data et IA, de la donnée brute à la production. Je cherche une alternance Data Science / IA.",
  not_found: "Cette page s'est égarée.",
  status: {
    SHIPPED: "DÉPLOYÉ",
    "IN PROGRESS": "EN COURS",
    TEAM: "ÉQUIPE",
    ARCHIVE: "ARCHIVE",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
