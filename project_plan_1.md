# project_plan.md — Agentronics Landing Page (Pivoted)

## The Pivot — What Changed

**Old thesis**: Agentronics = infrastructure middleware for WebMCP-enabled websites (auth, authz, memory, observability, context management for `navigator.modelContext` tool calls).

**New thesis**: Agentronics = **the agent governance plane for every enterprise website** — regardless of how the agent arrives. WebMCP is one ingestion path, not the whole product. Measurement is the wedge; agent-native commerce is the platform.

**Three agent arrival paths the product governs:**
1. **WebMCP-native** — agents calling `navigator.modelContext` tools → governed via SDK
2. **Web Bot Auth-signed** (OpenAI Agent, AWS AgentCore, future Anthropic/Google) → governed via cryptographic signature verification + policy
3. **Stealth Chromium** (Atlas, Comet, Operator pre-signing, Browser Use, Skyvern) → detected via behavioral fingerprinting, then governed

**Core positioning**: "They detect. We govern." HUMAN Security, Castle.io, Cloudflare Bot Management tell you *who*. Agentronics tells enterprises *what to do about it* — auth scopes, memory, audit trails, policy, blast-radius limits. Detection is an input to the governance plane, not the product.

**Analogy**: DoubleVerify / IAS / Moat for the agent web. Neutral third-party measurement and governance when Google, OpenAI, and Anthropic control the agents but won't tell you what they're doing on your site. DoubleVerify IPO'd at $4B. IAS is public. Moat sold to Oracle for $850M.

**Expansion path**: Measurement gets you in the door (cheap, urgent, quantifiable). Agent-native commerce is the real platform — how brands present, differentiate, and close with agents instead of humans. Structured product catalogs, agent-side bidding, agent trust scoring, agent-to-site negotiation.

---

## Design Direction

**Theme**: Same HydraDB-inspired dark aesthetic — dark background (#0a0a0f), monospace/code feel, `///` section prefixes, sharp cards with indigo glow borders, bold white headlines, muted body text. But the *energy* shifts from "developer infrastructure" to "enterprise command center." Think: security operations dashboard meets brand storytelling.

**Key visual motifs**:
- Three-lane ingestion diagram (WebMCP / Web Bot Auth / Stealth) converging into the Agentronics governance plane
- Real-time dashboard mockup showing agent traffic split (human vs. agent, by provider, by intent)
- "Your analytics are lying to you" data corruption visual — a GA-style chart with hidden agent contamination revealed

**Animations**: Same YC-style scroll-triggered reveals (Framer Motion), hero terminal animation (updated to show agent detection + governance, not just WebMCP tool calls), counter animations for metrics.

**Tech Stack**: React 19 + Vite + Tailwind CSS + Framer Motion. Single-page with hash sections + `/app` route for demo. No backend for the landing page.

---

## Page Structure

### 1. Navbar (sticky, glassmorphism on scroll)
- Logo: "Agentronics" wordmark (bold, white) — use logo from `/mnt/project/logo.png`
- Links: Why Agentronics · How It Works · Pricing · Docs (placeholder)
- CTA buttons: **Try Demo** (orange, navigates to `/app`) · **Book a Call** (outline)

### 2. Hero Section
- **Terminal-style animation** (typewriter effect — updated for pivoted thesis):
  ```
  > agent.detect()          ✓ ChatGPT Agent identified (Web Bot Auth)
  > agent.classify()        ✓ intent: price comparison — not purchasing
  > agent.govern()          ✓ read-only scope applied, audit logged
  > agent.measure()         ✓ attributed to @sarah's personal assistant
  ```
  Floating code card with dark bg and green/orange monospace text. Shows detection → classification → governance → measurement in one flow.

- **Headline**: "Know every agent on your site. Govern what they do."
- **Subheadline**: "AI agents are already browsing your site — via WebMCP, signed requests, or stealth automation. Your analytics can't tell the difference. Agentronics can."
- **Two CTAs**: `Try the Demo` (primary, orange gradient → `/app`) · `Get Early Access` (ghost/outline → scrolls to email capture)
- **Social proof strip below CTAs**: "HUMAN Security measured a 6,900% increase in AI-agent traffic since mid-2025" — small, muted, with source link
- Subtle animated grid/dot pattern background

### 3. Problem Section — "Your Analytics Are Lying"
- Section prefix: `///THE PROBLEM`
- Headline: "30% of your site traffic might not be human. You can't see it."
- **Visual**: Animated chart showing a "normal" analytics view that peels back to reveal hidden agent traffic underneath — the contamination reveal. Think: a line chart where the "real human" line drops and the "agent" line appears.
- **Three pain cards** (streamlined from 5 — the pivot focuses the problem):
  1. **Blind Measurement** — Icon: eye-slash. "Agent visits look like human visits. Your conversion rates, bounce rates, ad attribution — all contaminated with non-human traffic. You're making business decisions on numbers that are lying to you."
  2. **Zero Governance** — Icon: shield-off. "No identity layer, no permission model, no audit trail. Any agent can invoke any action on your site, at any rate, anonymously. An agent shopping for socks could trigger your admin tools."
  3. **No Agent Commerce Strategy** — Icon: store. "Agents are the new buyers. But your site is built to sell to humans — product pages, ad impressions, personalization. None of that works when the 'customer' is an LLM. You need a new interface."
- Bottom tagline: "Detection tools tell you who showed up. They don't tell you what to do about it."

### 4. Solution Section — "Detect. Govern. Sell."
- Section prefix: `///THE SOLUTION`
- Headline: "One SDK. Three agent classes. Full governance."

- **Three-lane architecture diagram** (SVG, animated):
  ```
  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
  │   WebMCP Agent   │     │ Web Bot Auth     │     │  Stealth Agent   │
  │ (Gemini, native) │     │ (ChatGPT, AWS)   │     │ (Comet, Operator)│
  └────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘
           │                        │                         │
           │    Tool call           │  Signed HTTP            │  Behavioral
           │    via modelContext    │  Ed25519 sig             │  fingerprint
           └────────────────────────┼─────────────────────────┘
                                    ▼
                     ┌──────────────────────────┐
                     │   AGENTRONICS GATEWAY     │
                     │                          │
                     │  Identity · Policy ·     │
                     │  Memory · Audit · Intent │
                     └──────────────────────────┘
                                    ▼
                     ┌──────────────────────────┐
                     │    YOUR WEBSITE / APP     │
                     │   (governed, measured)    │
                     └──────────────────────────┘
  ```
  Each lane animates in separately on scroll. The convergence into the gateway is the key visual moment.

- **Code snippet** showing the single-line integration (keep this — it's still true):
  ```js
  import { agentronics } from '@agentronics/sdk';
  agentronics.init({ siteId: 'your-site-id' });
  // Every agent — WebMCP, signed, or stealth — is now governed.
  ```

- **Five capability pills** below the diagram, fade-in stagger:
  - 🔐 Agent Identity — "Know which agent, on whose behalf, from which provider"
  - 🛡️ Policy Engine — "Scope permissions per agent class, rate limit, restrict tools"
  - 🧠 Cross-Session Memory — "Agents maintain context across page navigation"
  - 👁️ Audit & Observability — "Full trace of every action, exportable, compliance-ready"
  - 📊 Agent Analytics — "Separate agent metrics from human metrics — clean your data"

### 5. How It Works — 3-Step Flow
- Section prefix: `///HOW IT WORKS`
- Three numbered cards (01, 02, 03):
  1. **Drop in the SDK** — "One npm install, one init call. The SDK intercepts all three agent arrival paths — WebMCP tool calls, Web Bot Auth signatures, and behavioral signals — transparently."
  2. **See your real traffic** — "Your dashboard lights up immediately. Agent vs. human traffic split. Which agents (ChatGPT, Gemini, Claude). What they're doing. Who sent them. In real time."
  3. **Set the rules** — "Apply policy per agent class: read-only for price scrapers, full access for verified purchase agents, block for unauthorized bots. Every action logged for compliance."

### 6. Dashboard Preview Section — "See It In Action"
- Section prefix: `///DASHBOARD`
- **Mock dashboard screenshot/interactive mockup** showing:
  - Agent traffic pie chart (human 62% / ChatGPT Agent 18% / Gemini 12% / Claude 5% / Unknown 3%)
  - Live agent activity feed (tool calls in real time)
  - Agent trust scores
  - Policy violations / blocked actions counter
- **Side-by-side comparison** (preserved from old version but updated framing):
  - Left: "Without Agentronics" — raw GA dashboard, all traffic looks the same, decisions made on contaminated data
  - Right: "With Agentronics" — clean split, agent-specific metrics, governance in place
- **"Try the Live Demo →"** button (navigates to `/app`)

### 7. The Bigger Picture — "Agent-Native Commerce" (expansion tease)
- Section prefix: `///THE FUTURE`
- Headline: "Measurement gets you in the door. Selling to agents is the real game."
- Short paragraph: "Today's commerce stack assumes human visitors. But when agents become the dominant buyer, everything changes — product discovery, personalization, pricing, advertising. Agentronics is building the commerce layer for agent-mediated transactions."
- **Four preview cards** (teaser, not full product — coming soon energy):
  1. **Agent-Facing Catalogs** — "Structured, queryable product feeds that agents can reason over — not HTML pages designed for human eyes."
  2. **Agent Trust Scoring** — "Which agents convert, which are price-sensitive, which are researching vs. buying. Real-time signal for your merchandising."
  3. **Agent-Side Bidding** — "When Sarah's agent searches 'noise-cancelling headphones under $300' — how does your brand compete for that slot?"
  4. **Agent Negotiation** — "Returns policy, discount eligibility, loyalty programs — all exposed as tools the agent can query in real time."
- "Coming 2027" label or "Join the early access" CTA

### 8. Competitive Landscape
- Section prefix: `///LANDSCAPE`
- **Updated table/visual** reflecting the three-layer competitive view:

  | Category | Detection (They tell you WHO) | Governance (We tell you WHAT TO DO) |
  |---|---|---|
  | Bot Detection | HUMAN Security, Cloudflare, Fingerprint, CHEQ, Akamai | — |
  | Auth Layer | Castle.io, Nango | Agentronics (policy, scoping, rate limits) |
  | Observability | Snowplow, LangSmith, Braintrust | Agentronics (agent-specific audit trails) |
  | Memory/Context | Mem0, Letta | Agentronics (cross-session, cross-page) |
  | Agent Commerce | — | Agentronics (catalogs, trust scores, bidding) |

- Tagline: "They solve pieces. We govern the pipe."

### 9. Pricing Section
- Section prefix: `///PRICING`
- Three tier cards (same structure, updated copy):
  - **Free**: 1,000 governed agent interactions/mo, basic identity detection, community support — hooks indie devs and WebMCP experimenters
  - **Pro ($149/mo)**: 50K interactions, full three-path detection, policy engine, observability dashboard, agent analytics, email support
  - **Enterprise (Custom)**: Unlimited, SSO, audit trail exports, SLA, dedicated onboarding, agent commerce features (early access)
- Pro card highlighted as "Popular"

### 10. Early Access / Email Capture Section
- Section prefix: `///EARLY ACCESS`
- Headline: "Be the first to see your real traffic."
- Subheadline: "We're onboarding the first 50 sites. Drop your email and we'll set up a free agent traffic audit."
- **Email input + "Get Early Access" button** (same functionality as old site — stores email, could use Resend or a simple Vercel API route + Neon)
- Trust line below: "No credit card. 5-minute setup. See your agent traffic in real time."

### 11. The Builder Section
- Section prefix: `///THE BUILDER`
- Photo placeholder + Name: Neelakandan NC
- Quote: "WebMCP is the TCP/IP moment for AI agents on the web. Just as TCP/IP needed routers, firewalls, and load balancers — the agent web needs identity, governance, and measurement. That infrastructure is Agentronics."
- Credentials: Zera (MCP + Google ADK), NSCIF 2026 Top 100, context-hub contributor (PR #97 to andrewyng/context-hub)
- Social links: X (@NeelakandanNC), LinkedIn

### 12. Footer
- Logo, nav links, social icons
- "Built for the agentic web." tagline
- © 2026 Agentronics

---

## Animation Specs (Framer Motion)

| Element | Animation | Trigger |
|---|---|---|
| Hero terminal card | Typewriter line-by-line with blinking cursor (4 lines: detect → classify → govern → measure) | On mount, staggered 800ms per line |
| Section headlines | `y: 30 → 0`, `opacity: 0 → 1`, duration 0.6s | Scroll into viewport (whileInView) |
| Problem cards | Stagger fade-up, 150ms delay between cards | Scroll into viewport |
| Analytics corruption reveal | Chart morphs from "clean" to "split" showing hidden agent layer | Scroll into viewport |
| Three-lane architecture diagram | Each lane draws in (SVG path), then converges to gateway | Scroll into viewport, staggered |
| Capability pills | Stagger fade-in, 100ms delay | After architecture diagram completes |
| Dashboard mockup | Fade + slight scale-up from 0.97 | Scroll into viewport |
| Agent commerce preview cards | Stagger slide-up, 200ms delay | Scroll into viewport |
| Pricing cards | Scale 0.95 → 1 + opacity | Scroll into viewport |
| Counters (e.g. "6,900% agent traffic increase") | Count-up animation | Scroll into viewport |
| Navbar | `backdropFilter: blur` on scroll past hero | Scroll position |

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
| `--success` | `#00e676` | Terminal success indicators, detection confirmed |
| `--danger` | `#ef4444` | Blocked actions, policy violations |
| `--warning` | `#f59e0b` | Unknown agent, needs attention |
| `--code-bg` | `#1a1a2e` | Code block backgrounds |
| `--agent-chatgpt` | `#10a37f` | ChatGPT agent indicator in dashboard |
| `--agent-gemini` | `#4285f4` | Gemini agent indicator |
| `--agent-claude` | `#d97706` | Claude agent indicator |

---

## File Structure

```
agentronics-site/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── logo.png                    # Agentronics logo
├── src/
│   ├── main.jsx
│   ├── App.jsx                     # Router: / → Landing, /app → Demo
│   ├── pages/
│   │   ├── LandingPage.jsx         # All landing sections
│   │   └── AppPage.jsx             # WebMCP Amazon demo (existing)
│   ├── sections/
│   │   ├── Hero.jsx                # Terminal animation + headline + CTAs
│   │   ├── Problem.jsx             # "Your analytics are lying" + 3 pain cards
│   │   ├── Solution.jsx            # Three-lane architecture + code snippet + capability pills
│   │   ├── HowItWorks.jsx          # 3-step flow cards
│   │   ├── Dashboard.jsx           # Mock dashboard preview + side-by-side comparison
│   │   ├── AgentCommerce.jsx       # Future vision tease — 4 preview cards
│   │   ├── Landscape.jsx           # Competitive table
│   │   ├── Pricing.jsx             # 3 tier cards
│   │   ├── EarlyAccess.jsx         # Email capture form
│   │   ├── Builder.jsx             # Founder section
│   │   └── Footer.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TerminalAnimation.jsx   # Updated for detect → classify → govern → measure
│   │   ├── SectionHeading.jsx      # Reusable "///PREFIX" + headline
│   │   ├── PricingCard.jsx
│   │   ├── ProblemCard.jsx
│   │   ├── AgentTrafficChart.jsx   # Animated pie/bar chart for dashboard mockup
│   │   ├── ArchitectureDiagram.jsx # Three-lane SVG convergence diagram
│   │   ├── AnimatedCounter.jsx
│   │   └── EmailCapture.jsx        # Email input + submit (Vercel API route or client-side)
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
- `recharts` — agent traffic charts in dashboard mockup (optional, can be pure SVG)

---

## Backend (Minimal — Email Capture Only)

Same setup as old site for the email/waitlist capture:

1. Get your Neon connection string from console.neon.tech and paste it into .env:
   `DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require`
2. Start the API server (in a separate terminal):
   `npm run server`
3. Dev server (already running):
   `npm run dev`

The email capture form POSTs to a Vercel API route (or Express endpoint) that stores the email in Neon. Same flow as the old site — no changes needed here.

---

## Key Messaging Differences from Old Site

| Old Site | New Site |
|---|---|
| "The infrastructure layer for WebMCP-enabled websites" | "Know every agent on your site. Govern what they do." |
| 5 unsolved problems (auth, authz, memory, observability, context bloat) | 3 focused pains (blind measurement, zero governance, no agent commerce strategy) |
| WebMCP-only — assumes agents arrive via `navigator.modelContext` | Three-path — WebMCP + Web Bot Auth + Stealth Chromium |
| "One SDK line. Five problems solved." | "One SDK. Three agent classes. Full governance." |
| Infrastructure middleware positioning (Cloudflare analogy) | Neutral measurement + governance positioning (DoubleVerify analogy) |
| No mention of agent commerce | Agent-native commerce teased as the expansion platform |
| Cold technical framing | Leads with business pain ("your analytics are lying to you") |
| Competitive table: auth/authz/memory/observability/context vs. incumbents | Competitive table: detection vs. governance — "they detect, we govern" |

---

## Demo Integration (Preserved)

The **Try Demo** button still navigates to `/app` which loads the WebMCP Amazon demo (existing, built separately per `claude.md`). This demo now serves double duty:

1. Shows WebMCP in action (agents calling structured tools)
2. Is the **WebMCP-native path** in the three-lane story — the demo is what a governed WebMCP site looks like

The landing page tells the story. The demo proves the technology.