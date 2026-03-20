'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Meta } from '@/components/ui/bento-card'
import { fadeUp, staggerContainer } from '@/lib/motion'

function scrollToSection(sectionId: string) {
  const element = document.querySelector(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100vh] items-center justify-center px-6 py-32"
    >
      <div className="w-full max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="font-mono text-label-sm uppercase tracking-wider text-zinc-500"
          >
            <Meta prefix="#">status/seeking-internship</Meta>
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-display-lg font-light tracking-tighter text-zinc-100 md:text-[96px] md:leading-[1.05] lg:text-[120px]"
          >
            Katib Kachi
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-2xl font-mono text-body-sm text-zinc-400"
          >
            L3 CS @ Université Côte d&apos;Azur · Applied AI · ML Engineering
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="pt-8"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('#projects')}
              className="group h-12 rounded-none bg-zinc-900 px-8 font-mono text-xs uppercase tracking-wider text-zinc-200 transition-colors hover:border hover:border-[#00FF9F] hover:text-[#00FF9F]"
            >
              View Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex flex-wrap gap-6 border-t border-zinc-800 pt-8 font-mono text-label-sm uppercase tracking-wider text-zinc-500"
          >
            <Meta>5+ projects</Meta>
            <Meta>2 certifications</Meta>
            <Meta>python · ml · data</Meta>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
