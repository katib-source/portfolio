'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { transition } from '@/lib/motion'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

function scrollToSection(sectionId: string, closeMenu: () => void) {
  const target = document.getElementById(sectionId)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  closeMenu()
}

export function Header() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const showSolidBg = scrolled || isMobileMenuOpen

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[]

    if (!sections.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-50% 0px -50% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          showSolidBg
            ? 'border-b border-[#DDD8CC]/50 shadow-sm'
            : 'border-b border-transparent'
        )}
        style={{ backgroundColor: showSolidBg ? '#F0EBDF' : 'transparent' }}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-12 lg:px-20">
        <button
          onClick={() => scrollToSection('home', () => setIsMobileMenuOpen(false))}
          className="font-logo text-xl font-normal text-[--text-primary]"
          style={{ fontFamily: 'var(--font-logo), cursive' }}
          aria-label="Go to home section"
        >
          Katib
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.id, () => setIsMobileMenuOpen(false))}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative border-b-2 border-transparent pb-1 pt-1 font-sans text-sm transition-colors duration-300',
                  showSolidBg ? 'text-text-secondary' : 'text-text-primary',
                  'hover:text-primary',
                  isActive && 'border-primary text-primary'
                )}
                transition={transition}
              >
                {item.label}
              </motion.button>
            )
          })}
        </nav>

        <button
          onClick={handleMobileMenuToggle}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-300 hover:text-primary md:hidden',
            showSolidBg ? 'border-border text-text-secondary' : 'border-primary/20 text-text-primary'
          )}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-30 transition-opacity duration-300 md:hidden',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={cn(
          'fixed top-16 left-0 right-0 bottom-0 z-40 overflow-y-auto border-t border-[--border] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ backgroundColor: '#F0EBDF', opacity: 1 }}
      >
        <nav className="flex flex-col">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id, () => setIsMobileMenuOpen(false))}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'block w-full px-6 py-4 text-left text-base border-b border-[--border] transition-colors',
                  isActive ? 'text-primary bg-[--primary-light]' : 'text-[--text-primary] active:bg-[--primary-light]'
                )}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </>
  )
}
