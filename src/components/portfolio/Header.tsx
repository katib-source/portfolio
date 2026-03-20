'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { transition } from '@/lib/motion'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

function scrollToSection(href: string, closeMenu: () => void) {
  const target = document.querySelector(href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  closeMenu()
}

export function Header() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (!sections.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        rootMargin: '-32% 0px -52% 0px',
        threshold: [0.18, 0.35, 0.6],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-[#050505]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-12 lg:px-20">
        <button
          onClick={() => scrollToSection('#home', () => setIsMobileMenuOpen(false))}
          className="font-mono text-sm text-zinc-200"
          aria-label="Go to home section"
        >
          <span className="text-[#00FF9F]">K</span>atib
        </button>

        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1)

            return (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href, () => setIsMobileMenuOpen(false))}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative border-b border-transparent pb-1 font-mono text-xs uppercase tracking-wider text-zinc-500',
                  isActive && 'border-[#00FF9F] text-[#00FF9F]'
                )}
                whileHover={{ color: '#00FF9F' }}
                transition={transition}
              >
                {item.label}
              </motion.button>
            )
          })}
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center border border-zinc-700 text-zinc-300 md:hidden"
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
            className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-l border-zinc-800 bg-[#050505] p-4 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1)

                return (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.href, () => setIsMobileMenuOpen(false))}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'border border-zinc-800 px-3 py-2 text-left font-mono text-xs uppercase tracking-wider text-zinc-400',
                      isActive && 'border-[#00FF9F] text-[#00FF9F]'
                    )}
                    whileHover={{ borderColor: '#00FF9F', color: '#00FF9F' }}
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
