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
          onClick={() => setIsMobileMenuOpen((open) => !open)}
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
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={transition}
            className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-l border-[--border] bg-[--surface] p-4 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.id, () => setIsMobileMenuOpen(false))}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'rounded-lg border border-border px-3 py-2 text-left font-sans text-sm text-text-secondary transition-colors duration-300',
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
