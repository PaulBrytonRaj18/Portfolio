import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { services } from '../../data/index.js'
import styles from './Services.module.css'

const filenames = ['service-fullstack.sh', 'service-ai.sh', 'service-api.sh', 'service-landing.sh']

const icons = {
  layers: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  bot: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
    </svg>
  ),
  server: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
}

export default function Services() {
  const ref = useScrollReveal()

  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className={`section ${styles.section}`} ref={ref}>
      <div className="container">
        <span className="section-label">// services</span>
        <div className={styles.header}>
          <div>
            <h2 className="section-title">What I Can Build For You</h2>
            <p className="section-subtitle">Available for freelance projects and open to collaborations.</p>
          </div>
          <div className={styles.availability}>
            <span className={styles.availDot} />
            <span className={styles.availText}>Currently accepting new projects</span>
          </div>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <div key={s.title} className={`card ${styles.card} reveal reveal-delay-${i + 1}`}>
              <div className={styles.terminalHeader}>
                <span className={styles.dot} style={{ background: '#f85149' }} />
                <span className={styles.dot} style={{ background: '#d29922' }} />
                <span className={styles.dot} style={{ background: '#3fb950' }} />
                <span className={styles.terminalTitle}>{filenames[i]}</span>
              </div>
              <div className={styles.content}>
                <div className={styles.iconWrap}>{icons[s.icon]}</div>
                <h3 className={styles.title}><span className={styles.prompt}>&gt;</span> {s.title}</h3>
                <p className={styles.desc}>{s.description}</p>
                <button className={styles.cta} onClick={scrollToContact}>
                  ./inquire
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
