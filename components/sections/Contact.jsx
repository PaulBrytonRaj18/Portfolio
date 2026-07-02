"use client";
import { useState, useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { personalInfo } from '../../data/index.js'
import styles from './Contact.module.css'

const INITIAL_FORM = { name: '', email: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'required'
  if (!form.email.trim()) {
    errors.email = 'required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'invalid'
  }
  if (!form.message.trim()) {
    errors.message = 'required'
  } else if (form.message.trim().length < 10) {
    errors.message = 'min 10 chars'
  }
  return errors
}

export default function Contact() {
  const ref = useScrollReveal()
  const formRef = useRef(null)
  const terminalRef = useRef(null)
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const isSubmitting = status === 'sending'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validation = validate(form)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus('sending')

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT

    if (!endpoint) {
      const subject = encodeURIComponent('Portfolio inquiry from ' + form.name)
      const body = encodeURIComponent('Hi Paul,\n\n' + form.message + '\n\nFrom: ' + form.name + '\nEmail: ' + form.email)
      window.location.href = 'mailto:' + personalInfo.email + '?subject=' + subject + '&body=' + body
      setStatus('sent')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          apiKey: import.meta.env.VITE_STATICFORMS_KEY,
          replyTo: form.email,
        }),
      })
      const result = await res.json()
      if (result.success) {
        setStatus('sent')
        setForm(INITIAL_FORM)
        terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const errorIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  )

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <span className="section-label">// contact</span>
        <h2 className="section-title">Let's Build Something.</h2>
        <p className="section-subtitle" style={{ marginBottom: 48 }}>
          Have a project in mind? I would love to hear about it.
        </p>

        <div className={styles.grid}>
          <form className={styles.terminal + " reveal"} onSubmit={handleSubmit} ref={formRef} noValidate>
            {/* Honeypot */}
            <input type="text" name="botcheck" className={styles.honeypot} tabIndex={-1} autoComplete="off" />

            {/* Terminal header */}
            <div className={styles.terminalHeader}>
              <span className={styles.dot} style={{ background: '#f85149' }} />
              <span className={styles.dot} style={{ background: '#d29922' }} />
              <span className={styles.dot} style={{ background: '#3fb950' }} />
              <span className={styles.terminalTitle}>message.sh</span>
            </div>

            {/* Success output */}
            {status === 'sent' && (
              <div className={styles.terminalBody}>
                <p className={styles.termLine}>
                  <span className={styles.prompt}>$</span>
                  <span className={styles.cmd}> ./send --message</span>
                </p>
                <p className={styles.outputSuccess}><span className={styles.okPrefix}>[OK]</span> Message sent. I'll get back to you within 24 hours.</p>
                <div className={styles.termDivider} />
              </div>
            )}

            {/* Error output */}
            {status === 'error' && (
              <div className={styles.terminalBody}>
                <p className={styles.termLine}>
                  <span className={styles.prompt}>$</span>
                  <span className={styles.cmd}> ./send --message</span>
                </p>
                <p className={styles.outputError}>
                  {errorIcon} Failed. <a href={"mailto:" + personalInfo.email} className={styles.errorLink}>Email diretamente</a>
                  {' ou '}
                  <button type="button" className={styles.errorLink} onClick={() => setStatus('idle')}>tentar novamente</button>.
                </p>
                <div className={styles.termDivider} />
              </div>
            )}

            {/* Form fields */}
            <div className={styles.terminalBody} ref={terminalRef}>
              <p className={styles.termLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.cmd}> pwd</span>
              </p>
              <p className={styles.outputPwd}>/home/paul/contact</p>

              <p className={styles.termLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.cmd}> name --set</span>
              </p>
              {errors.name && (
                <p className={styles.outputError}>{errorIcon} {errors.name === 'required' ? 'Name is required' : errors.name}</p>
              )}
              <input
                id="name" name="name" type="text"
                className={`${styles.termInput} ${errors.name ? styles.termInputError : ''}`}
                placeholder="your name"
                value={form.name} onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="off"
              />

              <p className={styles.termLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.cmd}> email --set</span>
              </p>
              {errors.email && (
                <p className={styles.outputError}>{errorIcon} {errors.email === 'required' ? 'Email is required' : 'Invalid email format'}</p>
              )}
              <input
                id="email" name="email" type="email"
                className={`${styles.termInput} ${errors.email ? styles.termInputError : ''}`}
                placeholder="your@email.com"
                value={form.email} onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="off"
              />

              <p className={styles.termLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.cmd}> message --body</span>
              </p>
              {errors.message && (
                <p className={styles.outputError}>{errorIcon} {errors.message === 'required' ? 'Message is required' : 'At least 10 characters'}</p>
              )}
              <textarea
                id="message" name="message"
                className={`${styles.termTextarea} ${errors.message ? styles.termInputError : ''}`}
                placeholder="What are you building?"
                rows={4} value={form.message} onChange={handleChange}
                disabled={isSubmitting}
              />

              <div className={styles.termDivider} />

              <button
                type="submit"
                className={styles.sendBtn}
                disabled={isSubmitting}
              >
                <span className={styles.prompt}>&gt;</span>
                <span className={styles.cmd}>
                  {status === 'sending' && 'sending...'}
                  {status === 'sent' && 'message sent!'}
                  {status === 'error' && 'try again'}
                  {status === 'idle' && './send --message'}
                </span>
              </button>
              <p className={styles.formHint}># All fields required | Messages encrypted in transit</p>
            </div>
          </form>

          <div className={"card " + styles.infoCard + " reveal reveal-delay-1"}>
            <div className={styles.infoBody}>
              <p className={styles.termLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.cmd}> contact --paul</span>
              </p>
              <div className={styles.termDivider} />
              <div className={styles.infoItem}>
                <span className={styles.infoKey}>&gt; email</span>
                <a href={"mailto:" + personalInfo.email} className={styles.infoValue}>{personalInfo.email}</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoKey}>&gt; github</span>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.infoValue}>github.com/PaulBrytonRaj18</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoKey}>&gt; linkedin</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.infoValue}>/in/paul-bryton-raj</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoKey}>&gt; location</span>
                <span className={styles.infoValue}>Chennai, India</span>
              </div>
              <div className={styles.termDivider} />
              <div className={styles.statusRow}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>open_to_work</span>
              </div>
              <p className={styles.replyNote}>Typically replies within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
