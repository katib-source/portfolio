'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
      return
    }

    setIsMobileMenuOpen(true)
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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        showSolidBg
          ? 'border-border bg-surface/90 shadow-sm backdrop-blur-sm'
          : 'border-transparent bg-transparent'
      )}
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.button
            key="mobile-backdrop"
            type="button"
            aria-label="Close mobile menu overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto border-t border-[--border] bg-[--surface] md:hidden"
          >
            <nav className="flex flex-col">
              {navItems.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.id, () => setIsMobileMenuOpen(false))}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'block w-full border-b border-[--border] px-6 py-4 text-left font-sans text-base transition-colors duration-200 active:bg-[--primary-light]',
                      isActive ? 'bg-[--primary-light] text-primary' : 'text-[--text-primary] hover:bg-[--primary-light]/50'
                    )}
                    transition={transition}
                  >
                    {item.label}
                  </motion.button>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
