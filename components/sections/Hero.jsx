"use client";
import { useEffect, useRef } from 'react'
import { useTypewriter } from '../../hooks/useTypewriter.js'
import { useBootSequence } from '../../hooks/useBootSequence.js'
import { personalInfo, techTicker } from '../../data/index.js'
import styles from './Hero.module.css'

const roles = [
  'Full-Stack Developer',
  'React Engineer',
  'Python Developer',
  'AI Integration Builder',
  'Open Source Contributor',
]

const bootLines = [
  'Loading profile...',
  '✓ Full Stack Developer',
  '✓ AI Integration Builder',
  '✓ Open Source Contributor',
  '✓ Hackathon Winner',
]

export default function Hero() {
  const typed = useTypewriter(roles, 65, 1600)
  const { step, done, skip } = useBootSequence()
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    setTimeout(() => el.classList.add(styles.loaded), done ? 50 : 4000)
  }, [done])

  const scrollToProjects = (e) => {
    e.preventDefault()
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      {/* Boot sequence overlay */}
      {!done && (
        <div className={styles.bootOverlay} onClick={skip}>
          <div className={styles.bootTerminal}>
            <div className={styles.bootHeader}>
              <span className={styles.bootDot} style={{ background: '#f85149' }} />
              <span className={styles.bootDot} style={{ background: '#d29922' }} />
              <span className={styles.bootDot} style={{ background: '#3fb950' }} />
              <span className={styles.bootTitle}>boot.sh</span>
            </div>
            <div className={styles.bootBody}>
              <p className={styles.bootLine}>
                <span className={styles.bootPrompt}>$</span>
                <span className={styles.bootCmd}> boot portfolio</span>
              </p>
              {bootLines.map((line, i) => (
                <p
                  key={i}
                  className={`${styles.bootOutput} ${i <= step ? styles.bootVisible : ''}`}
                >
                  {line}
                </p>
              ))}
              {step >= bootLines.length - 1 && (
                <p className={`${styles.bootOutput} ${styles.bootReady}`}>
                  System Ready. <span className={styles.bootCursor}>▌</span>
                </p>
              )}
              <p className={styles.bootHint}>Click anywhere to skip</p>
            </div>
          </div>
        </div>
      )}

      {/* Green glow orb */}
      <div className={styles.orb} aria-hidden="true" />

      <div className={`container ${styles.content} ${!done ? styles.contentHidden : ''}`}>
        {/* Terminal greeting */}
        <div className={`${styles.terminal} ${styles.fadeItem}`} style={{ '--delay': '0ms' }}>
          <span className={styles.prompt}>paul@portfolio:~$</span>
          <span className={styles.cmd}> ./start --role </span>
          <span className={styles.typewriter}>{typed}</span>
          <span className={styles.cursor} aria-hidden="true">▌</span>
        </div>

        {/* Main headline */}
        <h1 className={`${styles.headline} ${styles.fadeItem}`} style={{ '--delay': '120ms' }}>
          Not impressive <span className={styles.accent}>demos</span>.
          <br />Working <span className={styles.accent}>products</span>.
        </h1>

        {/* Subtitle */}
        <p className={`${styles.subtitle} ${styles.fadeItem}`} style={{ '--delay': '240ms' }}>
          Software developer and CS student from Chennai.
          <br className="hide-mobile" />
          {' '}I work on React, Python, and problems worth solving.
        </p>

        {/* CTAs */}
        <div className={`${styles.ctas} ${styles.fadeItem}`} style={{ '--delay': '360ms' }}>
          <a href="#projects" className="btn btn-primary" onClick={scrollToProjects} aria-label="Scroll to Projects section">
            ./projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="Visit Paul's GitHub Profile">
            git clone profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        {/* Tech ticker */}
        <div className={`${styles.tickerWrap} ${styles.fadeItem}`} style={{ '--delay': '480ms' }}>
          <div className={styles.tickerTrack}>
            {[...techTicker, ...techTicker].map((t, i) => (
              <span key={i} className={styles.tickerItem}>
                <span className={styles.tickerDot} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
