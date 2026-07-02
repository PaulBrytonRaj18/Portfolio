"use client";
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { achievements } from '../../data/index.js'
import styles from './Achievements.module.css'

const iconMap = {
  trophy: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/>
      <path d="M7 4H4a1 1 0 0 0-1 1v3a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V5a1 1 0 0 0-1-1h-3"/>
      <rect x="7" y="2" width="10" height="6" rx="1"/>
    </svg>
  ),
  award: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  graduation: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
}

export default function Achievements() {
  const ref = useScrollReveal()

  return (
    <section id="achievements" className="section" ref={ref}>
      <div className="container">
        <span className="section-label">// recognition</span>
        <h2 className="section-title">Validated by Others</h2>
        <p className="section-subtitle" style={{ marginBottom: 48 }}>
          Not self-claimed. Judged and recognised by external panels.
        </p>

        <div className={styles.list}>
          {achievements.map((a, i) => (
            <div key={a.title} className={`${styles.item} reveal reveal-delay-${i + 1}`}>
              <div className={styles.iconWrap} style={{ background: `${a.color}18`, color: a.color }}>
                {iconMap[a.icon]}
              </div>
              <div className={styles.content}>
                <div className={styles.line}>
                  <span className={styles.indicator}>[OK]</span>
                  <span className={styles.title}>{a.title}</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.indicator}>│</span>
                  <span className={styles.key}>Amount:</span>
                  <span className={styles.value}>{a.amount}</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.indicator}>│</span>
                  <span className={styles.key}>Event:</span>
                  <span className={styles.value}>{a.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
