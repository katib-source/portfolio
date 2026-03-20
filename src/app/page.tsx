'use client'

import { Header } from '@/components/portfolio/Header'
import { Footer } from '@/components/portfolio/Footer'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { ProjectsSection } from '@/components/portfolio/ProjectsSection'
import { Certifications } from '@/components/portfolio/Certifications'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { ContactSection } from '@/components/portfolio/ContactSection'

export default function Home() {
  return (
    <div className="portfolio-page-bg flex min-h-screen flex-col overflow-x-clip">
      <Header />
      <main className="flex-1 pt-16">
        <HeroSection />
        <ProjectsSection />
        <Certifications />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
