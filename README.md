# Paul Bryton Raj — Portfolio

A terminal-themed developer portfolio built with React + Vite.  
Designed to feel like navigating a real developer workstation — shell prompts, command-line interactions, and system diagnostics — while remaining professional and recruiter-friendly.

## Features

- **Terminal boot sequence** — once-per-session startup animation (skippable)
- **Shell-inspired navigation** — `~/about`, `$ cd projects`, `./contact`
- **Help command palette** — press `?` or click the floating `>help` button
- **Real GitHub integration** — live contribution heatmap via GraphQL API with pattern fallback
- **Functional contact form** — backed by StaticForms with validation, honeypot, and error recovery
- **Terminal-themed sections** — every section styled as command output, file viewers, or system reports
- **Responsive** — mobile, tablet, and desktop layouts
- **SEO-optimized** — OG tags, Twitter Cards, meta keywords, robots
- **Dark terminal aesthetic** — green/cyan on pure black, CRT noise texture, dot-grid background

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Environment Variables

Create a `.env` file in the project root:

```env
# GitHub personal access token (no scopes needed) — enables live contribution data
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_token_here

# StaticForms endpoint and API key — enables the contact form
NEXT_PUBLIC_FORM_ENDPOINT=https://api.staticforms.dev/submit
NEXT_PUBLIC_STATICFORMS_KEY=sf_your_key_here
```

If `NEXT_PUBLIC_GITHUB_TOKEN` is not set, the contribution heatmap falls back to the Events API (last ~90 days) with a seeded pattern fill for older weeks.

If `NEXT_PUBLIC_FORM_ENDPOINT` is not set, the contact form falls back to a `mailto:` link.

## Project Structure

```
src/
├── components/
│   ├── layout/         Navbar, Footer
│   ├── sections/       Hero, About, WhyWorkWithMe, Projects,
│   │                   Skills, Achievements, Testimonials,
│   │                   Services, GitHubActivity, Contact
│   └── ui/             ProjectModal, HelpOverlay
├── data/               index.js  ← all portfolio content lives here
├── hooks/              useScrollReveal, useTypewriter, useBootSequence
├── styles/             global.css  ← design tokens and base styles
└── App.jsx
```

## Customization

All personal content is centralized in `src/data/index.js`:

| Export | What to update |
|--------|---------------|
| `personalInfo` | Name, email, GitHub/LinkedIn URLs, location, status |
| `projects` | Project details, case studies, tech stacks |
| `skills` | Technology categories and proficiency notes |
| `achievements` | Awards, prizes, and recognition |
| `testimonials` | Replace placeholder quotes with real ones |
| `services` | Service offerings and descriptions |
| `navLinks` | Navigation labels and section anchors |
| `techTicker` | Tech names displayed in the hero ticker |

### Theming

Design tokens are in `src/styles/global.css` — CSS custom properties control colors, spacing, typography, and radii. The terminal aesthetic uses:

```css
--bg-primary:     #000000;
--accent-primary: #22c55e;
--accent-cyan:    #22d3ee;
--text-primary:   #ffffff;
--font-mono:      'JetBrains Mono', monospace;
```

## Architecture Decisions

- **Zero runtime dependencies** — only React and ReactDOM. No animation libraries, icon packs, or CSS frameworks.
- **CSS Modules** — scoped styles per component, no global leakage.
- **Static-first** — fully static site. Contact form uses StaticForms API; no backend required.
- **Graceful degradation** — every external dependency (GitHub API, StaticForms) has a fallback path.
- **Seeded PRNG** — contribution patterns are deterministic per username, preventing flicker between renders.

## Performance

| Metric | Value |
|--------|-------|
| JS bundle | ~220 KB (67 KB gzip) |
| CSS bundle | ~45 KB (9 KB gzip) |
| Build time | ~1.5s |
| Dependencies | 2 (react, react-dom) |

## Deployment

Works with any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

```bash
npm run build   # outputs to dist/
```

Deploy the `dist/` folder to your host of choice. No server-side configuration needed.

## Tech Stack

- React 18
- Vite 5
- CSS Modules
- GitHub REST + GraphQL APIs
- StaticForms

## License

MIT
