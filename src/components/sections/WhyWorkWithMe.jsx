import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import styles from './WhyWorkWithMe.module.css'

const pillars = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Fast Communication',
    body: 'I respond within hours, not days. You always know where things stand — no chasing, no guessing.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Clean, Readable Code',
    body: 'I write code others can read, maintain, and build on top of. Not clever hacks — clear structure.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Documented Thoroughly',
    body: 'READMEs, setup guides, and inline comments come standard. You can always understand what was built and why.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: 'Responsive by Default',
    body: 'Every project works on mobile, tablet, and desktop. Responsive design is never an afterthought.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: 'Project Ownership Mindset',
    body: 'I treat your project like it\'s my own product. I think about edge cases, UX, and what happens after launch.',
  },
]

export default function WhyWorkWithMe() {
  const ref = useScrollReveal()

  return (
    <section id="why" className={`section ${styles.section}`} ref={ref}>
      <div className="container">
        <span className="section-label">// trust</span>
        <h2 className="section-title">What working with me<br />actually looks like.</h2>
        <p className="section-subtitle" style={{ marginBottom: 48 }}>
          No vanishing acts. No guesswork. Here's what you can expect.
        </p>

        <div className={styles.grid}>
          {pillars.map((p, i) => (
            <div key={p.title} className={`card ${styles.card} reveal reveal-delay-${i + 1}`}>
              <div className={styles.iconWrap}>{p.icon}</div>
              <h3 className={styles.title}>[INFO] {p.title}</h3>
              <p className={styles.body}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
