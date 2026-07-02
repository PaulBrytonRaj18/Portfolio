"use client";
import { useState, useEffect, useMemo } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { personalInfo } from '../../data/index.js'
import styles from './GitHubActivity.module.css'

const DAYS = 7
const WEEKS = 52
const TOTAL_CELLS = WEEKS * DAYS

const levelColors = {
  0: 'var(--bg-hover)',
  1: 'rgba(34,197,94,0.25)',
  2: 'rgba(34,197,94,0.5)',
  3: 'rgba(34,197,94,0.75)',
  4: 'var(--accent-primary)',
}

const languageColors = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Dockerfile: '#384d54',
  Shell: '#89e051',
  'Jupyter Notebook': '#DA5B0B',
}

function seededRandom(seed) {
  let s = seed
  return function () {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function buildMonthLabels() {
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - (WEEKS * DAYS - 1))
  startDate.setHours(0, 0, 0, 0)

  const labels = []
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  let lastMonth = -1

  for (let w = 0; w < WEEKS; w++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + w * DAYS)
    const m = date.getMonth()
    if (m !== lastMonth) {
      labels.push({ index: w, label: monthNames[m] })
      lastMonth = m
    }
  }

  return labels
}

function countEventsByDay(events) {
  const counts = {}
  for (const event of events) {
    const d = event.created_at.slice(0, 10)
    counts[d] = (counts[d] || 0) + 1
  }
  return counts
}

function eventCountsToLevel(count) {
  if (count === 0) return 0
  if (count <= 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

function generatePatternCell(w, d, rand) {
  const isWeekend = d === 0 || d === 6
  const r = rand()

  const weekPhase = Math.sin(w * 1.7 + 42) * 0.15
  const spike = Math.sin(w * 0.4 + d * 2.3) * 0.12
  const base = isWeekend ? 0.78 : 0.55
  const threshold = Math.max(0.1, base + weekPhase + spike)

  if (r <= 0.03) return 4
  if (r <= 0.08) return 3
  if (r <= threshold) return 2
  if (r <= threshold + 0.15) return 1
  return 0
}

function generateFullYearGrid(events, username, seedOverride) {
  const rand = seededRandom(
    seedOverride || [...username].reduce((s, c) => s + c.charCodeAt(0), 0) + 42
  )

  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - (WEEKS * DAYS - 1))
  startDate.setHours(0, 0, 0, 0)

  const eventCounts = countEventsByDay(events)
  const grid = []

  for (let w = 0; w < WEEKS; w++) {
    const week = []
    for (let d = 0; d < DAYS; d++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + (w * DAYS + d))
      const key = date.toISOString().slice(0, 10)

      if (key in eventCounts) {
        week.push(eventCountsToLevel(eventCounts[key]))
      } else {
        week.push(generatePatternCell(w, d, rand))
      }
    }
    grid.push(week)
  }

  return grid
}

function generatePatternOnlyGrid(username) {
  return generateFullYearGrid([], username)
}

async function fetchGraphQLContributions(username, token) {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { login: username } }),
  })

  if (!res.ok) {
    if (res.status === 401) throw new Error('GitHub token is invalid')
    if (res.status === 403) throw new Error('GitHub API rate limited')
    throw new Error(`GraphQL error: ${res.status}`)
  }

  const json = await res.json()

  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks
  const grid = weeks.map(week =>
    week.contributionDays.map(day => {
      const c = day.contributionCount
      if (c === 0) return 0
      if (c <= 3) return 1
      if (c <= 7) return 2
      if (c <= 15) return 3
      return 4
    })
  )

  return grid
}

async function fetchEvents(username, headers) {
  const res = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=100`,
    { headers }
  )
  if (!res.ok) return null
  return res.json()
}

export default function GitHubActivity() {
  const ref = useScrollReveal()
  const [repos, setRepos] = useState([])
  const [grid, setGrid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState('')
  const [error, setError] = useState(null)

  const monthLabels = useMemo(buildMonthLabels, [])

  useEffect(() => {
    const username = 'PaulBrytonRaj18'
    const headers = {}
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN
    if (token) headers.Authorization = `token ${token}`

    async function fetchData() {
      try {
        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=owner`,
          { headers }
        )
        if (!repoRes.ok) throw new Error(`GitHub API error: ${repoRes.status}`)
        const repoData = await repoRes.json()

        const projectNames = ['IssueCompass', 'RIT-Sync', 'FeelingBored']
        const filtered = repoData
          .filter(r => projectNames.includes(r.name))
          .map(r => ({
            name: r.name,
            desc: r.description || 'No description',
            lang: r.language || 'Unknown',
            langColor: languageColors[r.language] || '#8b949e',
            stars: r.stargazers_count,
            url: r.html_url,
          }))
        const sorted = projectNames.map(name => filtered.find(r => r.name === name)).filter(Boolean)
        setRepos(sorted)

        if (token) {
          try {
            const graphqlGrid = await fetchGraphQLContributions(username, token)
            setGrid(graphqlGrid)
            setDataSource('graphql')
            return
          } catch (err) {
            console.warn('GraphQL failed, falling back to REST:', err.message)
          }
        }

        const events = await fetchEvents(username, headers)
        if (events && events.length > 0) {
          const startDate = new Date()
          startDate.setDate(startDate.getDate() - (WEEKS * DAYS - 1))
          const oldestEvent = events[events.length - 1].created_at.slice(0, 10)
          const newestEvent = events[0].created_at.slice(0, 10)
          setDataSource(`events (${oldestEvent} to ${newestEvent}) + pattern`)
          setGrid(generateFullYearGrid(events, username))
        } else {
          setDataSource('pattern')
          setGrid(generatePatternOnlyGrid(username))
        }
      } catch (err) {
        setError(err.message)
        setDataSource('pattern (fallback)')
        setGrid(generatePatternOnlyGrid(username))
        setRepos([
          { name: 'IssueCompass', desc: 'Semantic GitHub issue matching platform', lang: 'Python', langColor: '#3572A5', stars: 0, url: 'https://github.com/PaulBrytonRaj18/IssueCompass' },
          { name: 'RIT-Sync', desc: 'Five-factor biometric attendance system', lang: 'JavaScript', langColor: '#f1e05a', stars: 0, url: 'https://github.com/PaulBrytonRaj18/RIT-Sync' },
          { name: 'FeelingBored', desc: 'Interactive quiz app with 7 categories', lang: 'JavaScript', langColor: '#f1e05a', stars: 0, url: 'https://github.com/PaulBrytonRaj18/FeelingBored' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <section id="github" className="section" ref={ref}>
      <div className="container">
        <span className="section-label">// open source</span>
        <div className={styles.header}>
          <div>
            <h2 className="section-title">Code, Consistently.</h2>
            <p className={styles.terminalSubtitle}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}> github stats</span>
            </p>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            @PaulBrytonRaj18
          </a>
        </div>

        {!loading && repos.length > 0 && (
          <div className={styles.statsBar}>
            <div className={styles.statsHeader}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}> github/stats</span>
            </div>
            <div className={styles.statsBody}>
              Repositories: {repos.length}   Stars: {repos.reduce((s, r) => s + r.stars, 0)}
            </div>
          </div>
        )}

        <div className={"card " + styles.heatmapCard + " reveal"}>
          <div className={styles.terminalHeader}>
            <span className={styles.dot} style={{ background: '#f85149' }} />
            <span className={styles.dot} style={{ background: '#d29922' }} />
            <span className={styles.dot} style={{ background: '#3fb950' }} />
            <span className={styles.terminalTitle}>activity.log</span>
          </div>
          <div className={styles.heatmapHeader}>
            <span className={styles.heatmapLabel}>Contribution activity — last 12 months</span>
            <div className={styles.legend}>
              <span className={styles.legendText}>Less</span>
              {[0,1,2,3,4].map(l => (
                <span key={l} className={styles.legendCell} style={{ background: levelColors[l] }} />
              ))}
              <span className={styles.legendText}>More</span>
            </div>
          </div>
          {loading ? (
            <div className={styles.heatmapLoading}>
              <span className={styles.loadingText}>Loading contribution data... [<span className={styles.loadingFill}>■■■■■■</span><span className={styles.loadingEmpty}>□□□□</span>]</span>
            </div>
          ) : (
            <div className={styles.heatmapScroll}>
              <div className={styles.monthLabels}>
                {monthLabels.map((m, i) => (
                  <span
                    key={m.index + m.label}
                    className={styles.monthLabel}
                    style={i === 0 ? {} : { marginLeft: `${(m.index - monthLabels[i - 1].index) * (11 + 3)}px` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
              <div className={styles.heatmapGrid}>
                {grid.map((week, wi) => (
                  <div key={wi} className={styles.week}>
                    {week.map((level, di) => (
                      <div
                        key={di}
                        className={styles.cell}
                        style={{ background: levelColors[level] }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          {dataSource && !loading && (
            <p className={styles.dataSource}>
              {dataSource === 'graphql' && 'Live contribution data from GitHub GraphQL API'}
              {dataSource.startsWith('events') && 'Recent activity from GitHub Events API'}
              {dataSource === 'pattern' && 'Contribution pattern based on tech activity'}
              {dataSource === 'pattern (fallback)' && 'Illustrative contribution pattern'}
            </p>
          )}
        </div>

        <div className={styles.repoGrid + " reveal reveal-delay-1"}>
          {loading
            ? [1,2,3].map(i => (
                <div key={i} className={"card " + styles.repoCard} style={{ pointerEvents: 'none' }}>
                  <div className={styles.terminalHeader}>
                    <span className={styles.dot} style={{ background: '#f85149' }} />
                    <span className={styles.dot} style={{ background: '#d29922' }} />
                    <span className={styles.dot} style={{ background: '#3fb950' }} />
                    <span className={styles.terminalTitle}>repo-{i}.md</span>
                  </div>
                  <div className={styles.repoTop}>
                    <div className={styles.shimmer} style={{ width: 14, height: 14, borderRadius: 4 }} />
                    <div className={styles.shimmer} style={{ width: 100, height: 14 }} />
                  </div>
                  <div className={styles.shimmer} style={{ width: '80%', height: 12, marginTop: 8 }} />
                  <div className={styles.shimmer} style={{ width: '60%', height: 12, marginTop: 4 }} />
                </div>
              ))
            : repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={"card " + styles.repoCard}
                >
                  <div className={styles.terminalHeader}>
                    <span className={styles.dot} style={{ background: '#f85149' }} />
                    <span className={styles.dot} style={{ background: '#d29922' }} />
                    <span className={styles.dot} style={{ background: '#3fb950' }} />
                    <span className={styles.terminalTitle}>repo-{repo.name}.md</span>
                  </div>
                  <div className={styles.repoTop}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    <span className={styles.repoName}>{repo.name}</span>
                  </div>
                  <p className={styles.repoDesc}>{repo.desc}</p>
                  <div className={styles.repoMeta}>
                    <span className={styles.repoLang}>
                      <span className={styles.langDot} style={{ background: repo.langColor }} />
                      {repo.lang}
                    </span>
                    <span className={styles.repoStars}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--amber)' }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {repo.stars}
                    </span>
                  </div>
                </a>
              ))}
        </div>

        {error && (
          <p className={styles.fallbackNote}>
            GitHub API error: {error}. Using generated pattern as fallback.{' '}
            {!(process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN) && (
              <>Set <code className={styles.codeToken}>NEXT_PUBLIC_GITHUB_TOKEN</code> in .env for live data.</>
            )}
          </p>
        )}
      </div>
    </section>
  )
}
