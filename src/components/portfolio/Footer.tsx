'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const socialLinks = [
  { icon: Github, href: 'https://github.com/katib-source', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/katib-kachi', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:kachikatib@gmail.com', label: 'Email' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Katib Kachi. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          {/* Built with */}
          <p className="text-sm text-muted-foreground">
            Built with <span className="text-primary">Next.js</span> & <span className="text-primary">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
