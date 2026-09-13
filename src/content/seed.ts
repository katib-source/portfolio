import type { SiteContent } from "@/lib/types";

/**
 * Built-in content. Used until the admin has saved anything to Redis, and as
 * the fallback whenever Redis is not configured (local dev, first deploy).
 */
export const SEED: SiteContent = {
  settings: {
    now: {
      en: "Master 1 AI at Université Côte d'Azur · deepening deep learning and French NLP · open to a Data Science / AI apprenticeship from September.",
      fr: "Master 1 IA à l'Université Côte d'Azur · approfondissement du deep learning et du NLP français · disponible pour une alternance Data Science / IA dès septembre.",
    },
  },
  certs: [
    {
      name: "Supervised Learning with scikit-learn",
      issuer: "DataCamp",
      date: "March 2026",
      link: "/certificates/supervised-scikit-learn.png",
    },
    {
      name: "Intermediate Deep Learning with PyTorch",
      issuer: "DataCamp",
      date: "March 2026",
      link: "/certificates/intermediate-pytorch.png",
    },
    { name: "ML Foundations Track", issuer: "Portfolio Credential Set", date: "2026", link: "" },
  ],
  projects: [
    {
      slug: "riviera-insight",
      color: "lilac",
      tag: "NLP",
      status: "SHIPPED",
      title: "RivieraInsight",
      badge: "74% POSITIVE",
      stack: "Python, FastAPI, Next.js, Playwright",
      link: "https://riviera-insight.vercel.app",
      desc: {
        en: "NLP competitive-intelligence tool for tourism operators on the French Riviera. Analyses TripAdvisor reviews with CamemBERT and KeyBERT.",
        fr: "Outil d'intelligence concurrentielle NLP pour les opérateurs touristiques de la Côte d'Azur. Analyse les avis TripAdvisor via CamemBERT et KeyBERT.",
      },
      blocks: {
        en: [
          "Riviera hotels and restaurants read their reviews by hand, one platform at a time, and never see how they compare with the place next door.",
          "1 240 TripAdvisor reviews collected with Playwright across 8 competing properties in Nice, cleaned and normalised for French text.",
          "CamemBERT for sentiment, KeyBERT for dominant keywords, served through a FastAPI service and read in a Next.js dashboard. Built for AzurEscape.",
          "74% positive sentiment as a baseline, dominant themes surfaced per competitor (view, breakfast, cleanliness, service) and a ranked score per property.",
        ],
        fr: [
          "Les hôtels et restaurants de la Côte d'Azur lisent leurs avis à la main, plateforme par plateforme, sans voir comment ils se situent face au voisin.",
          "1 240 avis TripAdvisor collectés avec Playwright sur 8 établissements concurrents à Nice, nettoyés et normalisés pour le français.",
          "CamemBERT pour le sentiment, KeyBERT pour les mots-clés dominants, exposés via un service FastAPI et lus dans un dashboard Next.js. Conçu pour AzurEscape.",
          "74% de sentiment positif comme référence, thèmes dominants par concurrent (vue, petit-déjeuner, propreté, service) et score classé par établissement.",
        ],
      },
    },
    {
      slug: "ml-hotel-cancellation",
      color: "yellow",
      tag: "ML",
      status: "SHIPPED",
      title: "ML Hotel Cancellation",
      badge: "AUC 0.95",
      stack: "Python, CatBoost, pandas, scikit-learn",
      link: "https://github.com/katib-source/hotel-fraud-model",
      desc: {
        en: "Booking cancellation model with an interpretable approach for day-to-day operational decisions.",
        fr: "Modèle de prédiction des annulations avec une approche interprétable pour les décisions opérationnelles.",
      },
      blocks: {
        en: [
          "Late cancellations break staffing and inventory planning; the front office needs to know which bookings are at risk, and why.",
          "Historical booking records, real and noisy: cleaning, missing values and feature preparation before any modelling.",
          "Several supervised models trained and compared, CatBoost retained, with explanatory-variable analysis so results can be argued, not just trusted.",
          "AUC-ROC of 0.95, the main cancellation risk drivers identified and formalised into operational recommendations.",
        ],
        fr: [
          "Les annulations tardives cassent la planification des équipes et des chambres : il faut savoir quelles réservations sont à risque, et pourquoi.",
          "Données historiques de réservation, réelles et bruitées : nettoyage, valeurs manquantes et préparation des variables avant toute modélisation.",
          "Plusieurs modèles supervisés entraînés et comparés, CatBoost retenu, avec analyse des variables explicatives pour pouvoir argumenter les résultats.",
          "AUC-ROC de 0,95, facteurs majeurs de risque identifiés et traduits en recommandations opérationnelles.",
        ],
      },
    },
    {
      slug: "azurescape-booking",
      color: "mint",
      tag: "WEB",
      status: "SHIPPED",
      title: "AzurEscape Booking",
      badge: "LIVE",
      stack: "React, Next.js, Node.js, PostgreSQL",
      link: "https://azurescape.fr",
      desc: {
        en: "Booking platform with user management and a reservation flow built for a clear client experience.",
        fr: "Plateforme de réservation avec gestion utilisateur et parcours de réservation clair côté client.",
      },
      blocks: {
        en: [
          "A local tourism operator needed its own booking flow instead of depending entirely on third-party platforms.",
          "User accounts, availability and reservations, modelled in PostgreSQL with REST endpoints on top.",
          "Front-end screens and supporting APIs delivered as a freelance developer, in short iterations with user feedback after each one.",
          "Live at azurescape.fr, with continuous delivery of priority features and a clearer product for end users.",
        ],
        fr: [
          "Un opérateur touristique local avait besoin de son propre parcours de réservation, sans dépendre uniquement des plateformes tierces.",
          "Comptes utilisateurs, disponibilités et réservations, modélisés en PostgreSQL avec des endpoints REST au-dessus.",
          "Écrans front-end et APIs de support livrés en freelance, par itérations courtes avec retours utilisateurs à chaque fois.",
          "En ligne sur azurescape.fr, avec livraison continue des fonctionnalités prioritaires et un produit plus lisible pour les utilisateurs finaux.",
        ],
      },
    },
    {
      slug: "reflexa-mobile-app",
      color: "coral",
      tag: "MOBILE",
      status: "IN PROGRESS",
      title: "Reflexa Mobile App",
      badge: "WIP",
      stack: "React Native, Node.js",
      link: "https://github.com/katib-source",
      desc: {
        en: "Mobile app built around real usage, with React Native interfaces and Node.js services.",
        fr: "Application mobile orientée usage réel, interfaces React Native et services Node.js.",
      },
      blocks: {
        en: [
          "Mobile-first habits deserve a mobile-first tool: the app targets real daily usage rather than a desktop feature list.",
          "Local state on the device, with Node.js services handling the parts that need to live on a server.",
          "React Native interfaces kept deliberately small, with intelligent features added one at a time behind a stable navigation shell.",
          "In progress — the navigation shell and core services are in place, feature work is ongoing.",
        ],
        fr: [
          "Des usages d'abord mobiles méritent un outil d'abord mobile : l'app vise l'usage quotidien réel plutôt qu'une liste de fonctionnalités desktop.",
          "État local sur l'appareil, avec des services Node.js pour ce qui doit vivre côté serveur.",
          "Interfaces React Native volontairement réduites, avec des fonctionnalités intelligentes ajoutées une à une derrière une navigation stable.",
          "En cours — la navigation et les services de base sont en place, le travail sur les fonctionnalités continue.",
        ],
      },
    },
    {
      slug: "takaful",
      color: "periwinkle",
      tag: "FULL-STACK",
      status: "TEAM",
      title: "Takaful",
      badge: "TEAM",
      stack: "TypeScript, SQL, MongoDB",
      link: "https://github.com/katib-source",
      desc: {
        en: "Team project covering application design, business logic and data integration.",
        fr: "Projet d'équipe croisant conception applicative, logique métier et intégration de données.",
      },
      blocks: {
        en: [
          "A multidisciplinary ESI project: turn a set of business needs into a working application with a real team, real deadlines and a shared codebase.",
          "Data structured across SQL and MongoDB, with the CRUD operations the functional modules required.",
          "Front-end and back-end modules designed together, then a test, fix and stabilisation phase before delivery.",
          "A coherent, operational deliverable validated against the functional and academic expectations.",
        ],
        fr: [
          "Projet pluridisciplinaire à l'ESI : transformer des besoins métier en application fonctionnelle, en équipe, avec de vraies échéances et une base de code partagée.",
          "Données structurées entre SQL et MongoDB, avec les opérations CRUD nécessaires aux modules fonctionnels.",
          "Modules front-end et back-end conçus ensemble, puis phase de test, correction et stabilisation avant livraison.",
          "Un livrable cohérent et opérationnel, validé au regard des attentes fonctionnelles et pédagogiques.",
        ],
      },
    },
    {
      slug: "2d-mario-engine",
      color: "sand",
      tag: "JAVA",
      status: "ARCHIVE",
      title: "2D Mario Engine",
      badge: "ARCHIVE",
      stack: "Java, LibGDX, Game loop",
      link: "https://github.com/katib-source/mario-2d-engine.git",
      desc: {
        en: "2D engine focused on game architecture, collisions and the render loop.",
        fr: "Moteur 2D orienté architecture de jeu, collisions et boucle de rendu.",
      },
      blocks: {
        en: [
          "Learning project: understand what a game engine actually does instead of using one.",
          "Tilemaps, sprites and entity state, all held in memory and updated per frame.",
          "A fixed-step game loop, collision handling and a rendering layer written from scratch in Java with LibGDX.",
          "A playable 2D engine and a much better feel for architecture, performance and where abstractions belong.",
        ],
        fr: [
          "Projet d'apprentissage : comprendre ce que fait réellement un moteur de jeu plutôt que d'en utiliser un.",
          "Tilemaps, sprites et état des entités, gardés en mémoire et mis à jour à chaque frame.",
          "Boucle de jeu à pas fixe, gestion des collisions et couche de rendu écrites de zéro en Java avec LibGDX.",
          "Un moteur 2D jouable et une bien meilleure intuition de l'architecture, des performances et de la place des abstractions.",
        ],
      },
    },
  ],
};
