// ============================================================
// PORTFOLIO DATA — Paul Bryton Raj
// ============================================================

export const personalInfo = {
  name: "Paul Bryton Raj",
  initials: "PBR",
  role: "Software Developer",
  tagline: "From idea to deployed product — I build things end to end.",
  subtitle:
    "Software developer and CS student from Chennai. I work on React, Python, and problems worth solving.",
  email: "paulbrytonraj18@gmail.com",
  phone: "+91 7358293518",
  location: "Chennai, India",
  github: "https://github.com/PaulBrytonRaj18",
  linkedin: "https://linkedin.com/in/paul-bryton-raj",
  status: "open_to_work",
  statusLabel: "Open to work",
  college: "Rajalakshmi Institute of Technology",
  degree: "B.E., Computer Science & Engineering (2025–2029)",
};

export const projects = [
  {
    id: "issuecompass",
    name: "IssueCompass",
    tagline: "Match open-source contributors to issues they can actually solve.",
    description:
      "A semantic matching platform that analyzes your GitHub activity to build a personal skill fingerprint, then uses vector similarity search to surface GitHub issues you can genuinely contribute to — across thousands of repositories.",
    type: "Full-Stack · AI · Open Source",
    featured: true,
    status: "Live",
    github: "https://github.com/PaulBrytonRaj18/IssueCompass",
    demo: "https://issue-compass.vercel.app",
    tech: ["Next.js", "FastAPI", "Python", "PostgreSQL", "pgvector", "Redis", "Docker", "Groq LLM", "GitHub API", "GitHub Actions"],
    problem:
      "Developers waste hours browsing GitHub looking for issues they can actually solve. Tools like goodfirstissue.dev are generic lists — zero personalization, zero intelligence. Contributors with strong Python skills keep getting matched to Rust repos.",
    solution:
      "IssueCompass analyzes your actual GitHub repos and commit history to build a 128-dimensional skill vector. It then uses pgvector semantic similarity search to rank thousands of open issues by how well they match your demonstrated abilities — not just language tags.",
    architecture:
      "Next.js frontend → FastAPI backend (JWT + GitHub OAuth) → PostgreSQL with pgvector for vector search → Redis for API caching and rate limiting → ARQ background workers for issue indexing → 8-gate GitHub Actions CI/CD pipeline → Deployed on Render.",
    challenges: [
      "Designing graceful Redis degradation — the app stays fully functional even when Redis is down, just slower.",
      "Building an 8-job CI/CD pipeline: env-check → lint → test → db-validate → startup-validate → docker-validate → deploy. No broken deployments reach production.",
      "Implementing pgvector similarity search with 128-dim vectors efficiently at scale.",
    ],
    results: [
      "Full CI/CD pipeline with 8 validation gates — zero broken deployments",
      "104 backend tests with mocked DB and Redis",
      "Deployed and live on Render with Docker + Nginx",
      "Groq LLM integration for natural language issue search",
    ],
    color: "#8b5cf6",
  },
  {
    id: "ritsync",
    name: "RIT-Sync",
    tagline: "Smart attendance platform with five-factor biometric verification.",
    description:
      "A production-ready attendance management system that eliminates proxy attendance using facial recognition, GPS geofencing, Bluetooth beacon proximity, device binding, and liveness detection — simultaneously.",
    type: "Full-Stack · Security · EdTech",
    featured: false,
    status: "Built",
    github: "https://github.com/PaulBrytonRaj18/RIT-Sync",
    demo: null,
    tech: ["React", "Spring Boot", "Java", "MySQL", "face-api.js", "Docker", "Redis", "Nginx", "WebSocket", "Deck.gl"],
    problem:
      "Traditional attendance systems are trivially exploited — students mark friends present via shared passwords or printed photos. No existing system combines biometric, location, proximity, and device checks simultaneously in a privacy-compliant way.",
    solution:
      "Five simultaneous verification factors: (1) Face ID with ZKP encryption — server never sees raw biometrics. (2) Edge AI liveness detection — blink + head movement, runs on-device. (3) Precision GPS with <10m accuracy validation. (4) Bluetooth beacon proximity via RSSI. (5) Device binding with email verification.",
    architecture:
      "React PWA frontend (offline-first with IndexedDB sync) → Spring Boot backend (JWT, BCrypt, Bucket4j rate limiting) → MySQL with Flyway migrations → Redis caching → WebSocket for real-time heatmaps → Deck.gl WebGL classroom visualization → Docker + Nginx deployment.",
    challenges: [
      "Implementing Zero-Knowledge Proof for biometrics — face descriptors are AES-256-GCM encrypted client-side; the server validates via HMAC without ever seeing raw biometric data.",
      "Building offline-first attendance marking with IndexedDB queuing and automatic sync on reconnect.",
      "DBSCAN clustering for classroom heatmap analytics with live WebSocket updates.",
    ],
    results: [
      "Proxy attendance reduced from ~15% to <1%",
      "Attendance marking time cut from 15–20 min to <2 min",
      "GDPR/FERPA compliant — zero raw biometrics on server",
      "Offline-first PWA — works in low-connectivity environments",
    ],
    color: "#22d3ee",
  },
  {
    id: "feelingbored",
    name: "FeelingBored",
    tagline: "A polished quiz app that actually makes downtime fun.",
    description:
      "A modern, responsive quiz application with 7 categories — Technology, Mathematics, Space, History, Sports, Food, and Entertainment. Built with a focus on component architecture, smooth UX, and mobile-first design.",
    type: "Frontend · React",
    featured: false,
    status: "Live",
    github: "https://github.com/PaulBrytonRaj18/FeelingBored",
    demo: null,
    tech: ["React", "JavaScript", "React Router", "Context API", "Bootstrap 5", "HTML5", "CSS3", "Vite"],
    problem:
      "Most quiz apps are visually dated, unresponsive on mobile, and don't track progress or allow theming — making the experience feel cheap and throwaway.",
    solution:
      "A fully componentized React quiz platform with client-side routing, global state via Context API, real-time score tracking, progress indicators, answer validation with visual feedback, result visualization, and a dark/light theme toggle that persists across sessions.",
    architecture:
      "React SPA with Vite bundler → React Router v6 for client-side routing → Context API for global quiz state (theme, score, progress) → Bootstrap 5 for responsive grid → Custom CSS for theming.",
    challenges: [
      "Designing a Context API state architecture that handles quiz flow, score tracking, and theme switching without prop drilling.",
      "Building a timer system that syncs with question transitions without causing re-render storms.",
    ],
    results: [
      "Fully responsive — mobile, tablet, desktop",
      "Dark/light theme with persistent preference",
      "7 categories with distinct visual identities",
      "Smooth navigation with zero page reloads",
    ],
    color: "#3fb950",
  },
];

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React.js", note: "IssueCompass, RIT-Sync, FeelingBored" },
      { name: "Next.js", note: "IssueCompass" },
      { name: "TypeScript", note: "IssueCompass frontend" },
      { name: "JavaScript", note: "All projects" },
      { name: "HTML5 / CSS3", note: "" },
      { name: "Tailwind CSS", note: "" },
      { name: "Bootstrap 5", note: "FeelingBored" },
      { name: "Vite", note: "" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Python", note: "IssueCompass, Flux" },
      { name: "FastAPI", note: "IssueCompass, Flux" },
      { name: "Spring Boot", note: "RIT-Sync" },
      { name: "Java", note: "RIT-Sync" },
      { name: "Django", note: "HDFD training" },
      { name: "REST API Design", note: "" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", note: "RIT-Sync" },
      { name: "PostgreSQL", note: "IssueCompass, Flux" },
      { name: "pgvector", note: "IssueCompass — vector search" },
      { name: "MongoDB", note: "HDFD training" },
      { name: "Redis", note: "IssueCompass — caching" },
    ],
  },
  {
    category: "AI & LLMs",
    items: [
      { name: "Groq / Llama 3.3", note: "IssueCompass" },
      { name: "Gemini API", note: "Flux" },
      { name: "LLM Integration", note: "" },
      { name: "Vector Search", note: "pgvector, semantic matching" },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", note: "IssueCompass, RIT-Sync, Flux" },
      { name: "GitHub Actions", note: "IssueCompass CI/CD" },
      { name: "GCP Cloud Run", note: "Flux deployment" },
      { name: "Render", note: "IssueCompass deployment" },
      { name: "Nginx", note: "IssueCompass, RIT-Sync" },
      { name: "Git / Linux", note: "" },
    ],
  },
];

export const achievements = [
  {
    icon: "trophy",
    color: "#f59e0b",
    title: "1st Prize — AGAM International Entrepreneur Summit",
    amount: "₹1,00,000",
    detail: "Conducted by SRM University · International Competition",
  },
  {
    icon: "award",
    color: "#8b5cf6",
    title: "3× Technical Hackathon Winner",
    amount: "3 Wins",
    detail: "College-level competitions · Rajalakshmi Institute of Technology",
  },
  {
    icon: "graduation",
    color: "#22d3ee",
    title: "A Grade (Excellent) — Honours Diploma in Full Stack Development",
    amount: "A Grade",
    detail: "Computer Software College, Nandivaram-Guduvancheri · Mar–Oct 2025",
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Paul delivered a clean, well-documented full-stack project that exceeded our expectations. His communication throughout was excellent — always responsive, always clear.",
    name: "Professor / Mentor",
    role: "Add name & role here",
    avatar: "PM",
  },
  {
    id: 2,
    quote:
      "One of the most initiative-driven students I've worked with. Paul doesn't wait to be told what to build — he identifies the problem and ships a solution.",
    name: "Hackathon Mentor",
    role: "Add name & role here",
    avatar: "HM",
  },
  {
    id: 3,
    quote:
      "Working with Paul on the team project was seamless. He writes code others can actually read and maintain, which made collaboration genuinely easy.",
    name: "Team Member",
    role: "Add name & role here",
    avatar: "TM",
  },
];

export const services = [
  {
    icon: "layers",
    title: "Full-Stack Web Application",
    description:
      "React frontend paired with a Python (FastAPI) or Java (Spring Boot) backend. Database design, authentication, deployment — end to end.",
    cta: "Let's Talk",
  },
  {
    icon: "bot",
    title: "AI Integration",
    description:
      "Connect LLMs and AI APIs to your existing app or build new AI-powered features. Groq, Gemini, and vector search integrations.",
    cta: "Let's Talk",
  },
  {
    icon: "server",
    title: "REST API Development",
    description:
      "FastAPI or Spring Boot APIs with auth, CRUD operations, database integration, and proper documentation.",
    cta: "Let's Talk",
  },
  {
    icon: "globe",
    title: "Landing Page & Portfolio",
    description:
      "Fast, responsive, and built to convert. Clean design, mobile-first, and deployed. Like this one.",
    cta: "Let's Talk",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "GitHub", href: "#github" },
];

export const techTicker = [
  "React", "FastAPI", "Python", "Spring Boot", "MySQL",
  "Docker", "GCP", "Next.js", "PostgreSQL", "Redis",
  "GitHub Actions", "Java", "TypeScript", "Vite", "Nginx",
];
