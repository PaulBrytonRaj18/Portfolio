# Paul Bryton Raj — Portfolio

A premium personal portfolio built with React + Vite.
Design inspired by GitHub Dark × Linear × Vercel.

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

## Customisation

All personal data is in one file: `src/data/index.js`

Update:
- `personalInfo` — name, email, GitHub, LinkedIn, etc.
- `projects` — your project details and case study content
- `skills` — your technology stack
- `achievements` — awards and recognition
- `testimonials` — replace placeholder quotes with real ones
- `services` — what you offer

## Structure

```
src/
├── components/
│   ├── layout/       Navbar, Footer
│   ├── sections/     Hero, About, WhyWorkWithMe, Projects,
│   │                 Skills, Achievements, Testimonials,
│   │                 Services, GitHubActivity, Contact
│   └── ui/           ProjectModal
├── data/             index.js  ← edit this
├── hooks/            useScrollReveal, useTypewriter
├── styles/           global.css
└── App.jsx
```

## Deployment

Works with Vercel, Netlify, or any static host.
Run `npm run build` and deploy the `dist/` folder.

## Tech Stack
- React 18
- Vite 5
- CSS Modules
- No external UI libraries
