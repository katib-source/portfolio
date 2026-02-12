'use client'

import { Header } from '@/components/portfolio/Header'
import { Footer } from '@/components/portfolio/Footer'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { ProjectsSection } from '@/components/portfolio/ProjectsSection'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { ResumeSection } from '@/components/portfolio/ResumeSection'
import { ContactSection } from '@/components/portfolio/ContactSection'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
