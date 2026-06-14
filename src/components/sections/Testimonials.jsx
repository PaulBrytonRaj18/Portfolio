import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { testimonials } from '../../data/index.js'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const ref = useScrollReveal()

  return (
    <section id="testimonials" className="section" ref={ref}>
      <div className="container">
        <span className="section-label">// testimonials</span>
        <h2 className="section-title">What Others Say</h2>
        <p className="section-subtitle" style={{ marginBottom: 48 }}>
          Feedback from professors, mentors, and collaborators.
        </p>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={t.id} className={`card ${styles.card} reveal reveal-delay-${i + 1}`}>
              <div className={styles.terminalHeader}>
                <span className={styles.dot} style={{ background: '#f85149' }} />
                <span className={styles.dot} style={{ background: '#d29922' }} />
                <span className={styles.dot} style={{ background: '#3fb950' }} />
                <span className={styles.terminalTitle}>{['mentor-review.txt', 'teammate-review.txt', 'professor-review.txt'][i]}</span>
              </div>
              <div className={styles.content}>
                <div className={styles.quoteIcon} aria-hidden="true">"</div>
                <p className={styles.quote}>{t.quote}</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>{t.avatar}</div>
                  <div>
                    <p className={styles.name}>{t.name}</p>
                    <p className={styles.role}>{t.role}</p>
                  </div>
                </div>
                <div className={styles.placeholder}>
                  <span className={styles.placeholderBadge}># slot available — add your testimonial</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
