# app.md — Agentronics Product Dashboard UI

## Overview

The **App** is the product UI a user sees when they click "Try Demo" from the landing page. It's a simulated Agentronics dashboard that demonstrates all five infrastructure pillars in action — using the WebMCP Amazon demo as the live context.

**Route**: `/app`
**Design**: Same dark theme as landing page. Sidebar nav + main content area. Think Datadog/Vercel dashboard aesthetic but with the HydraDB color palette.

---

## Layout

```
┌──────────────────────────────────────────────────┐
│  Agentronics    [site selector ▾]    [? Docs] [⚙] │  ← Top bar
├────────┬─────────────────────────────────────────┤
│        │                                         │
│  🏠 Overview │        Main Content Area          │
│  🔐 Auth     │                                   │
│  🛡 Authz    │                                   │
│  🧠 Memory   │                                   │
│  📊 Observe  │                                   │
│  📦 Context  │                                   │
│  ⚙ Settings │                                   │
│        │                                         │
├────────┴─────────────────────────────────────────┤
│  WebMCP Amazon Demo — embedded iframe / link      │  ← Bottom panel (optional)
└──────────────────────────────────────────────────┘
```

---

## Pages / Tabs

### 1. Overview (default view)

The at-a-glance dashboard. Shows real-time-ish stats from the demo site.

**Metric cards** (top row, 4 cards):
- **Agents Connected**: `3` (Gemini CLI, Claude Chrome, GPT-5 Agent)
- **Tool Calls (24h)**: `1,247` (animated counter)
- **Auth Failures**: `12` (red accent)
- **Avg Latency**: `23ms`

**Live Activity Feed** (center):
A scrolling log of recent tool calls, styled like a terminal:
```
14:32:01  gemini-cli    searchProducts({query: "headphones"})     ✓ 200  18ms
14:32:04  gemini-cli    addToCart({productId: "E001", qty: 2})    ✓ 200  22ms
14:32:06  claude-agent  browseCategory({category: "Books"})       ✓ 200  15ms
14:32:09  unknown-bot   placeOrder({})                            ✗ 403  DENIED
```
Color-coded: green for success, red for denied, orange for warnings.

**Tool Call Distribution** (chart):
- Bar chart or donut showing calls per tool (searchProducts: 340, addToCart: 280, viewCart: 210, etc.)

**Agent Breakdown** (small table):
| Agent | Calls | Errors | Avg Latency |
|---|---|---|---|
| gemini-cli | 847 | 3 | 18ms |
| claude-chrome | 312 | 1 | 24ms |
| gpt5-agent | 88 | 8 | 31ms |

### 2. Authentication (Auth)

Shows the agent identity layer.

**Registered Agents** table:
| Agent ID | Display Name | Auth Method | Status | Last Seen |
|---|---|---|---|---|
| `agt_gem_001` | Gemini CLI | OAuth 2.1 Token Exchange | Active | 2 min ago |
| `agt_cld_002` | Claude Chrome | Browser Session | Active | 5 min ago |
| `agt_gpt_003` | GPT-5 Agent | API Key | Active | 12 min ago |
| `agt_unk_004` | Unknown Bot | None | Blocked | 1 hr ago |

**Auth Events Timeline** (recent auth attempts):
- Success/failure events with timestamps
- Failed attempts highlighted in red with reason (no token, expired, invalid scope)

**Config Panel** (right sidebar or modal):
- Toggle: Require agent authentication (on/off)
- Allowed auth methods: checkboxes (OAuth 2.1, API Key, Browser Session)
- Token expiry: dropdown (1h, 24h, 7d, 30d)
- Rate limit per agent: input (default: 100 calls/min)

### 3. Authorization (Authz)

Permission management for tool calls.

**Permission Matrix** (the centerpiece):
A grid showing tools × agent roles with allow/deny/prompt toggles:

| Tool | `admin` | `shopper` | `read-only` | `unknown` |
|---|---|---|---|---|
| searchProducts | ✅ | ✅ | ✅ | ✅ |
| addToCart | ✅ | ✅ | ❌ | ❌ |
| removeFromCart | ✅ | ✅ | ❌ | ❌ |
| placeOrder | ✅ | ⚠️ confirm | ❌ | ❌ |
| getCheckoutSummary | ✅ | ✅ | ✅ | ❌ |

Color key: ✅ green = allow, ❌ red = deny, ⚠️ orange = require user confirmation

**Policy Editor** (code-style):
```yaml
policy:
  - role: shopper
    allow:
      - searchProducts
      - browseCategory
      - addToCart
      - viewCart
    deny:
      - placeOrder (without confirmation)
    rate_limit: 50/min
```

**Recent Denials Log**:
Shows blocked tool calls with agent, tool, reason, timestamp.

### 4. Memory

Agent session and context persistence.

**Active Sessions** (cards):
Each card shows:
- Agent name + ID
- Session duration
- Pages visited (breadcrumb: Home → Search → Cart)
- Items in context (products viewed, cart contents)
- Memory size: `2.3 KB`

**Session Detail View** (click into a session):
A timeline/graph showing the agent's journey:
```
[Home] → searchProducts("headphones") → [Search Results] → addToCart("E001") → [Cart] → proceedToCheckout → [Checkout]
```
With context snapshots at each step showing what the agent "remembers."

**Memory Config**:
- Session TTL: dropdown (30min, 1h, 24h)
- Max context size: input (default: 10KB)
- Cross-page persistence: toggle on/off
- GDPR auto-purge: toggle + retention days input

### 5. Observability

Full audit trail and analytics.

**Trace Viewer** (main area):
OpenTelemetry-style trace waterfall for a single agent interaction:
```
▼ Agent Request: "buy headphones" (total: 4.2s)
  ├── searchProducts({query: "headphones"})  [18ms]  ✓
  ├── addToCart({productId: "E001", qty: 2}) [22ms]  ✓
  │   └── user confirmation requested        [2.1s]  ✓ approved
  ├── proceedToCheckout({})                  [15ms]  ✓
  └── placeOrder({})                         [31ms]  ✓
      └── user confirmation requested        [1.8s]  ✓ approved
```
Each span expandable to show input/output payloads.

**Dashboard Charts**:
- Tool calls over time (line chart, 24h)
- Error rate (line chart overlay)
- P50 / P95 / P99 latency (bar chart)
- Top tools by call volume (horizontal bar)

**Audit Log** (filterable table):
| Timestamp | Agent | Tool | Input | Status | Latency | Trace ID |
|---|---|---|---|---|---|---|
| 14:32:01 | gemini-cli | searchProducts | `{query: "headphones"}` | 200 | 18ms | `tr_a8f3...` |

Export button: CSV / JSON

### 6. Context Management

Tool surfacing and context bloat reduction.

**Registered Tools** (from the connected WebMCP site):
Table showing all 12+ tools with their status:
| Tool | Page | readOnly | Calls (24h) | Avg Tokens | Status |
|---|---|---|---|---|---|
| searchProducts | Home | ✅ | 340 | 120 | Active |
| addToCart | Global | ❌ | 280 | 95 | Active |
| filterSearchResults | Search | ✅ | 45 | 180 | Active |
| placeOrder | Checkout | ❌ | 12 | 85 | Active |

**Context Optimizer** (the key differentiator):
Visual showing:
- **Before**: All 14 tools sent → 14,200 tokens per call → $0.043/call
- **After**: Smart filtering → 5 relevant tools → 4,100 tokens → $0.012/call
- **Savings**: 71% token reduction

Configuration:
- Context mode: `all` | `page-aware` | `intent-based` (dropdown)
- Max tools per call: slider (3–50)
- Priority tools: drag-and-drop ranking

**Tool Dependency Graph** (optional, nice-to-have):
A small node graph showing which tools are commonly called together:
`searchProducts → addToCart → viewCart → proceedToCheckout → placeOrder`

### 7. Settings

- **Site Configuration**: Site ID, SDK version, gateway URL
- **Webhook URLs**: For auth events, denials, errors
- **API Keys**: Generate / revoke keys for programmatic access
- **Team**: Invite members (placeholder)
- **Billing**: Current plan indicator (links to pricing on landing page)

---

## Embedded Demo Panel

At the bottom or as a toggleable split-pane, embed (or link to) the existing WebMCP Amazon demo running on `localhost:5173`. This lets users see the governed tool calls happening in real-time as they interact with the demo site while the dashboard updates above.

**Implementation**: Either an `<iframe>` pointing to the demo, or a "Open Demo in New Tab" button. The dashboard simulates live data based on a timer / mock event stream.

---

## Data Strategy

This is a **demo/simulated dashboard** — no real backend. All data is:
- Hardcoded mock data in JSON files
- Animated with timers to simulate live updates (new log entries every few seconds)
- Stored in Zustand or React state

The activity feed should auto-generate new mock events every 3–5 seconds to feel alive.

---

## File Structure (additions to the landing page project)

```
src/
├── pages/
│   └── AppPage.jsx                  # Dashboard shell with sidebar + router
├── app/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── TopBar.jsx
│   ├── views/
│   │   ├── OverviewView.jsx
│   │   ├── AuthView.jsx
│   │   ├── AuthzView.jsx
│   │   ├── MemoryView.jsx
│   │   ├── ObservabilityView.jsx
│   │   ├── ContextView.jsx
│   │   └── SettingsView.jsx
│   ├── components/
│   │   ├── MetricCard.jsx
│   │   ├── ActivityFeed.jsx
│   │   ├── TraceWaterfall.jsx
│   │   ├── PermissionMatrix.jsx
│   │   ├── SessionCard.jsx
│   │   ├── ToolTable.jsx
│   │   └── ContextOptimizer.jsx
│   └── data/
│       ├── mockAgents.js
│       ├── mockToolCalls.js
│       ├── mockSessions.js
│       └── mockTraces.js
```

---

## Key Interactions

1. **Landing → App**: User clicks "Try Demo" → navigates to `/app` → Overview loads with animated counters and live feed
2. **Sidebar nav**: Click tabs to switch views, URL updates (`/app/auth`, `/app/observe`, etc.)
3. **Activity feed**: Auto-scrolls, new entries appear with a subtle slide-in animation
4. **Permission matrix**: Clickable cells toggle allow/deny/confirm (local state only)
5. **Context optimizer**: Toggling modes shows before/after token counts animating
6. **Trace viewer**: Click a trace row to expand the waterfall spans