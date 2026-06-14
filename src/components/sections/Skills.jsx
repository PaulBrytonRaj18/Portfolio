import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { skills } from '../../data/index.js'
import styles from './Skills.module.css'

const categoryCommands = {
  'Frontend': '$ npm list frontend',
  'Backend': '$ pip freeze backend',
  'Database': '$ docker ps',
  'AI & LLMs': '$ pip list | grep -i ai',
  'DevOps & Tools': '$ which docker git nginx',
}

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <span className="section-label">// stack</span>
        <h2 className="section-title">Technologies I Work With</h2>
        <p className="section-subtitle" style={{ marginBottom: 48 }}>
          Used across real projects — not just listed.
        </p>

        <div className={styles.grid}>
          {skills.map((group, i) => (
            <div key={group.category} className={`${styles.group} reveal reveal-delay-${i + 1}`}>
              <div className={styles.groupHeader}>{categoryCommands[group.category]}</div>
              <div className={styles.items}>
                {group.items.map((item, idx) => {
                  const isLast = idx === group.items.length - 1
                  const connector = isLast ? '└── ' : '├── '
                  return (
                    <div key={item.name} className={styles.item}>
                      <span className={styles.connector}>{connector}</span>
                      <span className={styles.itemName}>{item.name}</span>
                      {item.note && (
                        <span className={styles.itemNote}> # {item.note}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
