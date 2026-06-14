import { useState, useEffect } from 'react'
import { personalInfo } from '../../data/index.js'
import styles from './Navbar.module.css'

const terminalLinks = [
  { path: 'about', href: '#about' },
  { path: 'projects', href: '#projects' },
  { path: 'services', href: '#services' },
  { path: 'github', href: '#github' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} onClick={(e) => handleNavClick(e, '#hero')}>
          <span className={styles.logoPrompt}>~</span>
          <span className={styles.logoSlash}>/</span>
          <span className={styles.logoText}>Paul</span>
          <span className={styles.logoPrompt}> $</span>
          <span className={styles.logoCursor}>▌</span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          {terminalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span className={styles.navPrompt}>$ cd </span>
              <span className={styles.navPath}>{link.path}</span>
            </a>
          ))}
        </nav>

        {/* CTA + Status */}
        <div className={styles.actions}>
          <span className={styles.statusDot}>
            <span className={styles.dot} />
            <span className={styles.statusLabel}>Open to work</span>
          </span>
          <a
            href="#contact"
            className="btn btn-primary btn-sm"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            ./contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {terminalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span className={styles.mobilePrompt}>~/</span>
              <span className={styles.mobilePath}>{link.path}</span>
            </a>
          ))}
          <a
            href="#contact"
            className={styles.mobileContact}
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <span className={styles.mobilePrompt}>$ </span>
            ./contact
          </a>
        </div>
      )}
    </header>
  )
}
