"use client";
import { useEffect, useState } from 'react'
import styles from './HelpOverlay.module.css'

const commands = [
  { key: 'about', desc: 'View background and experience' },
  { key: 'projects', desc: 'Explore projects and case studies' },
  { key: 'skills', desc: 'Browse technical stack' },
  { key: 'github', desc: 'Check GitHub activity' },
  { key: 'contact', desc: 'Send a message' },
]

export default function HelpOverlay() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setOpen(!open)}
        aria-label="Show help"
        title="Press ? for help"
      >
        <span className={styles.fabPrompt}>&gt;</span>
        <span className={styles.fabText}>help</span>
      </button>

      {open && (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className={styles.terminal}>
            <div className={styles.header}>
              <span className={styles.dot} style={{ background: '#f85149' }} />
              <span className={styles.dot} style={{ background: '#d29922' }} />
              <span className={styles.dot} style={{ background: '#3fb950' }} />
              <span className={styles.title}>help.sh — ?</span>
              <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close">:q</button>
            </div>
            <div className={styles.body}>
              <p className={styles.line}>
                <span className={styles.prompt}>$</span>
                <span className={styles.cmd}> help</span>
              </p>
              <p className={styles.output}>Available commands:</p>
              <div className={styles.divider} />
              {commands.map((cmd) => (
                <button
                  key={cmd.key}
                  className={styles.cmdBtn}
                  onClick={() => scrollTo('#' + cmd.key)}
                >
                  <span className={styles.cmdName}>~/</span>
                  <span className={styles.cmdNameHighlight}>{cmd.key}</span>
                  <span className={styles.cmdArrow}>→</span>
                  <span className={styles.cmdDesc}>{cmd.desc}</span>
                </button>
              ))}
              <div className={styles.divider} />
              <p className={styles.hint}>Press Escape or :q to close</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
