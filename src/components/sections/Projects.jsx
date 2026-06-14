import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { projects } from '../../data/index.js'
import ProjectModal from '../ui/ProjectModal.jsx'
import styles from './Projects.module.css'

export default function Projects() {
  const ref = useScrollReveal()
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filters = [
    { label: '--all', value: 'All' },
    { label: '--fullstack', value: 'Full-Stack' },
    { label: '--frontend', value: 'Frontend' },
    { label: '--ai', value: 'AI' },
  ]

  const filtered = projects.filter(p => {
    if (activeFilter === 'All') return true
    return p.type.toLowerCase().includes(activeFilter.toLowerCase())
  })

  const featured = filtered.find(p => p.featured)
  const rest = filtered.filter(p => !p.featured)

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <span className="section-label">// work</span>
        <div className={styles.header}>
          <div>
            <h2 className="section-title">Things I've Built</h2>
            <p className={styles.meta}>
              <span className={styles.metaMono}>$ ls --filter={activeFilter.toLowerCase()}</span>
            </p>
          </div>
          <div className={styles.filters}>
            {filters.map(f => (
              <button
                key={f.value}
                className={`${styles.filterBtn} ${activeFilter === f.value ? styles.active : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {featured && (
          <div className={`${styles.featured} reveal`}>
            <div className={styles.featuredContent}>
              <div className={styles.featuredTermHeader}>
                <div className={styles.termDots}>
                  <span className={styles.termDot} style={{ background: '#f85149' }} />
                  <span className={styles.termDot} style={{ background: '#d29922' }} />
                  <span className={styles.termDot} style={{ background: '#3fb950' }} />
                </div>
                <span className={styles.termFilename}>featured.sh</span>
              </div>
              <div className={styles.featuredMeta}>
                <span className={styles.typeTag}>{featured.type}</span>
                <span className={`${styles.statusBadge} ${styles[featured.status.toLowerCase()]}`}>
                  {featured.status}
                </span>
              </div>
              <h3 className={styles.featuredTitle}>{featured.name}</h3>
              <p className={styles.featuredDesc}>{featured.description}</p>
              <div className={styles.techList}>
                {featured.tech.slice(0, 6).map(t => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
                {featured.tech.length > 6 && (
                  <span className="tech-pill">+{featured.tech.length - 6} more</span>
                )}
              </div>
              <div className={styles.featuredActions}>
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                {featured.demo && (
                  <a
                    href={featured.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    Live Demo
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                )}
                <button
                  className="btn btn-primary btn-sm"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  onClick={() => setSelectedProject(featured)}
                >
                  $ cat README.md
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.featuredVisual}>
              <div className={styles.browserMock}>
                <div className={styles.browserBar}>
                  <span className={styles.browserDot} style={{ background: '#f85149' }} />
                  <span className={styles.browserDot} style={{ background: '#d29922' }} />
                  <span className={styles.browserDot} style={{ background: '#3fb950' }} />
                  <span className={styles.browserUrl}>$ issue-compass.vercel.app</span>
                </div>
                <div className={styles.browserBody}>
                  <div className={styles.mockNav}>
                    <div className={styles.mockLogo} />
                    <div className={styles.mockNavLinks}>
                      <div className={styles.mockLine} style={{ width: 40 }} />
                      <div className={styles.mockLine} style={{ width: 52 }} />
                      <div className={styles.mockLine} style={{ width: 44 }} />
                    </div>
                  </div>
                  <div className={styles.mockHero}>
                    <div className={styles.mockTitle} />
                    <div className={styles.mockSubtitle} />
                    <div className={styles.mockBtn} />
                  </div>
                  <div className={styles.mockCards}>
                    {[1,2,3].map(i => (
                      <div key={i} className={styles.mockCard}>
                        <div className={styles.mockCardLine} />
                        <div className={styles.mockCardLine} style={{ width: '70%' }} />
                        <div className={styles.mockCardLine} style={{ width: '50%' }} />
                        <div className={styles.mockTags}>
                          <div className={styles.mockTag} />
                          <div className={styles.mockTag} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.grid}>
          {rest.map((project, i) => (
            <div
              key={project.id}
              className={`card ${styles.projectCard} reveal reveal-delay-${i + 1}`}
              style={{ '--project-color': project.color }}
            >
              <div className={styles.cardTermHeader}>
                <div className={styles.termDots}>
                  <span className={styles.termDot} style={{ background: '#f85149' }} />
                  <span className={styles.termDot} style={{ background: '#d29922' }} />
                  <span className={styles.termDot} style={{ background: '#3fb950' }} />
                </div>
                <span className={styles.termFilename}>~/projects/{project.id}/</span>
              </div>
              <div className={styles.cardTop}>
                <div className={styles.cardMeta}>
                  <span className={styles.typeTagSmall}>{project.type}</span>
                  <span className={`${styles.statusBadge} ${styles[project.status.toLowerCase()]}`}>
                    {project.status}
                  </span>
                </div>
                <div className={styles.cardLinks}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    aria-label="GitHub"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      aria-label="Live Demo"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <h3 className={styles.cardTitle}>{project.name}</h3>
              <p className={styles.cardDesc}>{project.tagline}</p>

              <div className={styles.techList}>
                {project.tech.slice(0, 4).map(t => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className="tech-pill">+{project.tech.length - 4}</span>
                )}
              </div>

              <button
                className={styles.caseStudyBtn}
                onClick={() => setSelectedProject(project)}
              >
                $ cat README.md
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
