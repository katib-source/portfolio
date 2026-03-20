import type { Variants } from 'framer-motion'

export const MOTION = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1] as const,
  stagger: 0.05,
}

export const transition = {
  duration: MOTION.duration,
  ease: MOTION.ease,
}

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...transition,
      delay: custom * MOTION.stagger,
    },
  }),
}

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ...transition,
      staggerChildren: MOTION.stagger,
      delayChildren: MOTION.stagger * 2,
    },
  },
}

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      ...transition,
      duration: MOTION.duration - MOTION.stagger * 2,
    },
  },
}
