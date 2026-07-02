import { personalInfo } from '../../data/index.js'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.prompt}>$</span>
          <span className={styles.logo}>{personalInfo.initials}</span>
          <span className={styles.copy}>
            © {new Date().getFullYear()} Paul Bryton Raj. Built with React.
          </span>
        </div>
        <div className={styles.right}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label="Paul Bryton Raj GitHub Profile"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label="Paul Bryton Raj LinkedIn Profile"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className={styles.link}
            aria-label="Send Email to Paul Bryton Raj"
          >
            Email
          </a>
        </div>
      </div>
      <div className={styles.exitLine}>
        <span className={styles.exitPrompt}>$</span>
        <span className={styles.exitCmd}> exit 0</span>
        <span className={styles.exitCursor}>▌</span>
      </div>
    </footer>
  )
}
