import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { personalInfo, achievements } from '../../data/index.js'
import styles from './About.module.css'

const quickStats = [
  { value: '₹1L', label: 'Prize Won', sub: 'AGAM Summit' },
  { value: '3×', label: 'Hackathon Winner', sub: 'College level' },
  { value: '3', label: 'Deployed Projects', sub: 'Live & maintained' },
]

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <span className="section-label">// about</span>
        <h2 className="section-title">A developer who builds,<br />not just codes.</h2>

        <div className={styles.grid}>
          {/* Terminal card */}
          <div className={`card ${styles.terminal} reveal`}>
            <div className={styles.terminalHeader}>
              <span className={styles.dot} style={{ background: '#f85149' }} />
              <span className={styles.dot} style={{ background: '#d29922' }} />
              <span className={styles.dot} style={{ background: '#3fb950' }} />
              <span className={styles.terminalTitle}>about.sh</span>
            </div>
            <div className={styles.terminalBody}>
              <p><span className={styles.prompt}>$</span> <span className={styles.cmd}>pwd</span></p>
              <p className={styles.output}>/home/paul</p>
              <br />
              <p><span className={styles.prompt}>$</span> <span className={styles.cmd}>uptime</span></p>
              <p className={styles.output}>Active since Oct 2024 | 3+ projects shipped</p>
              <br />
              <p><span className={styles.prompt}>$</span> <span className={styles.cmd}>whoami</span></p>
              <p className={styles.output}>paul_bryton_raj</p>
              <br />
              <p><span className={styles.prompt}>$</span> <span className={styles.cmd}>cat focus.txt</span></p>
              <p className={styles.output}>Full-Stack Development</p>
              <p className={styles.output}>AI Integrations</p>
              <p className={styles.output}>REST API Design</p>
              <p className={styles.output}>Open Source</p>
              <br />
              <p><span className={styles.prompt}>$</span> <span className={styles.cmd}>echo $LOCATION</span></p>
              <p className={styles.output}>Chennai, India</p>
              <br />
              <p><span className={styles.prompt}>$</span> <span className={styles.cmd}>cat status.txt</span></p>
              <p className={styles.statusLine}>
                <span className={styles.greenDot} />
                <span className={styles.green}>open_to_work</span>
              </p>
              <br />
              <p><span className={styles.prompt}>$</span> <span className={styles.cmd}>cat education.txt</span></p>
              <p className={styles.output}>B.E. CSE @ RIT (2025–2029)</p>
              <p className={styles.output}>HDFD — A Grade (Excellent)</p>
              <br />
              <p><span className={styles.prompt}>$</span> <span className={styles.cmd}>cat achievements.txt</span></p>
              {achievements.map((a) => (
                <p key={a.title} className={styles.output}>{a.amount} — {a.title}</p>
              ))}
            </div>
          </div>

          {/* Narrative */}
          <div className={styles.narrative}>
            <div className={`reveal reveal-delay-1`}>
              <p className={styles.para}>
                I'm <strong style={{ color: 'var(--text-primary)' }}>Paul Bryton Raj</strong> — a software developer and
                first-year CS student at Rajalakshmi Institute of Technology, Chennai.
                I started building real projects before my first semester ended.
              </p>
            </div>
            <div className={`reveal reveal-delay-2`}>
              <p className={styles.para}>
                <strong style={{ color: 'var(--text-primary)' }}>IssueCompass</strong> matches developers
                to open-source issues using semantic vector search.{' '}
                <strong style={{ color: 'var(--text-primary)' }}>RIT-Sync</strong> prevents attendance fraud
                with five-factor biometric verification — face ID, GPS, Bluetooth, liveness detection,
                and device binding simultaneously.
              </p>
            </div>
            <div className={`reveal reveal-delay-3`}>
              <p className={styles.para}>
                I care about writing clean code, documenting properly, and shipping
                things that actually work. Not impressive demos — working products.
              </p>
            </div>

            {/* Quick stats */}
            <div className={`${styles.stats} reveal reveal-delay-4`}>
              {quickStats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                  <span className={styles.statSub}>{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
