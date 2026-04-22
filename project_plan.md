# project_plan.md — Agentronics Landing Page

## Design Direction

**Theme**: HydraDB-inspired — dark background (#0a0a0f), monospace/code aesthetic, `///` section prefixes, sharp cards with subtle purple/indigo glow borders, bold white headlines, muted body text.

**Animations**: YC-style — smooth scroll-triggered fade-up/slide-in reveals (Framer Motion or GSAP ScrollTrigger), a hero typewriter/terminal animation, logo ticker marquee for "trusted by" strip, counter animations for metrics, subtle particle/grid background on hero.

**Tech Stack**: React 19 + Vite + Tailwind CSS + Framer Motion. Single-page with hash sections. No backend.

---

## Page Structure

### 1. Navbar (sticky, glassmorphism on scroll)
- Logo: "Agentronics" wordmark (bold, white)
- Links: Why Agentronics · How It Works · Pricing · Docs (placeholder)
- CTA buttons: **Try Demo** (orange, navigates to `/app`) · **Book a Call** (outline)

### 2. Hero Section
- **Terminal-style animation** (typewriter effect):
  ```
  > agent.authenticate()     ✓ verified
  > agent.callTool("addToCart", {id: "E001"})   ✓ authorized
  > agent.getSession()       ✓ context loaded
  ```
  This runs in a floating code card with a dark card bg and green/orange monospace text.
- **Headline**: "The infrastructure layer for the agentic web."
- **Subheadline**: "WebMCP ships the protocol. Agentronics ships auth, memory, observability, and context management — in one SDK line."
- **Two CTAs**: `Try the Demo` (primary, orange gradient) · `Read the Docs` (ghost/outline)
- Subtle animated grid/dot pattern background

### 3. Problem Section — "5 Unsolved Problems"
- Section prefix: `///THE PROBLEM`
- Headline: "WebMCP is shipping. The operational chaos is already beginning."
- **5 cards** in a horizontal scroll or responsive grid, each with:
  - Icon (lock, shield, brain, eye, compress)
  - Title: No Authentication / No Authorization / No Memory / No Observability / Context Bloat
  - 2-line description
  - Bottom label in orange: Security Risk / Compliance Blocker / Broken Experience / Ops Blindspot / Cost × Quality
- Cards have dark bg (#12121a), subtle purple border glow, fade-in-up on scroll

### 4. Solution Section — "One SDK. Five problems solved."
- Section prefix: `///THE SOLUTION`
- Architecture diagram (SVG or animated):
  ```
  [WebMCP Site] ←→ [Agentronics SDK + Gateway] ←→ [AI Agent]
  ```
  With labeled layers: Auth · Authz · Memory · Observability · Context Mgmt
- Code snippet showing the single-line integration:
  ```js
  import { agentronics } from '@agentronics/sdk';
  agentronics.init({ siteId: 'your-site-id' });
  // That's it. Every tool call is now governed.
  ```
- Fade-in animation for each layer label

### 5. How It Works — 3-Step Flow
- Section prefix: `///HOW IT WORKS`
- Three numbered cards (01, 02, 03) styled like HydraDB use-cases:
  1. **Add the SDK** — One npm install, one init call. The SDK wraps `navigator.modelContext.registerTool` transparently.
  2. **Configure from Dashboard** — Set auth rules, permission scopes, memory retention, and observability alerts from a single control plane.
  3. **Agents are governed** — Every tool call is authenticated, authorized, logged, and context-optimized. Zero code changes to your existing WebMCP tools.

### 6. Demo Section — "See It In Action"
- Section prefix: `///DEMO`
- Side-by-side comparison (like slide 4 of pitch deck):
  - Left: "Browser Automation (DOM)" — 45s, fragile, breaks on UI changes
  - Right: "WebMCP + Agentronics" — 20s, structured, governed
- **"Try the Live Demo →"** button (navigates to `/app` — the product UI)
- Optionally embed a short looping video/GIF placeholder

### 7. Competitive Landscape
- Section prefix: `///LANDSCAPE`
- Table or visual grid showing categories (Auth, Authz, Memory, Observability, Context) with incumbents vs. new players vs. Agentronics spanning all five
- Tagline: "They solve pieces. We govern the pipe."

### 8. Pricing Section
- Section prefix: `///PRICING`
- Three tier cards (HydraDB style with monthly/yearly toggle):
  - **Free**: 1,000 governed tool calls/mo, basic auth, community support
  - **Pro ($149/mo)**: 50K calls, full auth + authz + memory, observability dashboard, email support
  - **Enterprise (Custom)**: Unlimited, SSO, audit trails, SLA, dedicated onboarding
- Pro card highlighted as "Popular"

### 9. The Builder Section
- Section prefix: `///THE BUILDER`
- Photo placeholder + Name: Neelakandan NC
- Quote: the TCP/IP analogy
- Credentials: Zera, NSCIF 2026 finalist, context-hub contributor
- Social links: X, LinkedIn

### 10. Footer
- Logo, nav links, social icons
- "Built for the agentic web." tagline
- © 2026 Agentronics

---

## Animation Specs (Framer Motion)

| Element | Animation | Trigger |
|---|---|---|
| Hero terminal card | Typewriter line-by-line with blinking cursor | On mount, staggered 800ms per line |
| Section headlines | `y: 30 → 0`, `opacity: 0 → 1`, duration 0.6s | Scroll into viewport (whileInView) |
| Problem cards | Stagger fade-up, 150ms delay between cards | Scroll into viewport |
| Architecture diagram | Draw SVG paths + fade labels | Scroll into viewport |
| Pricing cards | Scale 0.95 → 1 + opacity | Scroll into viewport |
| Logo ticker | CSS marquee / infinite horizontal scroll | Always running |
| Navbar | `backdropFilter: blur` on scroll past hero | Scroll position |
| Counters (e.g. "50+ tools → 5 relevant") | Count-up animation | Scroll into viewport |

---

## Color System

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0a0a0f` | Page background |
| `--bg-card` | `#12121a` | Card backgrounds |
| `--border-glow` | `#6c5ce7` / `rgba(108, 92, 231, 0.3)` | Card borders, glows |
| `--accent` | `#FF9900` | CTAs, highlights, labels |
| `--text-primary` | `#ffffff` | Headlines |
| `--text-secondary` | `#a0a0b0` | Body text |
| `--success` | `#00e676` | Terminal success indicators |
| `--code-bg` | `#1a1a2e` | Code block backgrounds |

---

## File Structure

```
agentronics-site/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx                     # Router: / → Landing, /app → Product UI
│   ├── pages/
│   │   ├── LandingPage.jsx         # All landing sections
│   │   └── AppPage.jsx             # Product dashboard (see app.md)
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Problems.jsx
│   │   ├── Solution.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Demo.jsx
│   │   ├── Landscape.jsx
│   │   ├── Pricing.jsx
│   │   ├── Builder.jsx
│   │   └── Footer.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TerminalAnimation.jsx
│   │   ├── SectionHeading.jsx      # Reusable "///PREFIX" + headline
│   │   ├── PricingCard.jsx
│   │   ├── ProblemCard.jsx
│   │   └── AnimatedCounter.jsx
│   ├── hooks/
│   │   └── useScrollReveal.js      # Intersection Observer or Framer Motion wrapper
│   └── index.css                   # Tailwind + custom CSS vars
```

---

## Key Dependencies

- `react` + `react-dom` (19)
- `react-router-dom` (v7) — for `/` and `/app` routing
- `framer-motion` — scroll animations, typewriter, stagger
- `tailwindcss` + `@tailwindcss/vite`
- `lucide-react` — icons




  To get it running:

  1. Get your Neon connection string from console.neon.tech and paste it into .env:
  DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
  2. Start the API server (in a separate terminal):
  npm run server
  3. Dev server (already running):
  npm run dev