import express from 'express'
import cors from 'cors'
import { neon } from '@neondatabase/serverless'
import { env } from './lib/env.js'

const app = express()

app.disable('x-powered-by')

app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  if (env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }
  next()
})

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true)
      if (env.ALLOWED_ORIGINS.includes(origin)) return cb(null, true)
      return cb(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST'],
    credentials: false,
  }),
)

app.use(express.json({ limit: '16kb' }))

const sql = neon(env.DATABASE_URL)

async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      business TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('Database ready')
}

const RATE_WINDOW_MS = 60_000
const RATE_MAX = 5
const ipHits = new Map()

function rateLimit(req, res, next) {
  const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown'
  const now = Date.now()
  const entry = ipHits.get(ip) ?? { count: 0, resetAt: now + RATE_WINDOW_MS }
  if (now > entry.resetAt) {
    entry.count = 0
    entry.resetAt = now + RATE_WINDOW_MS
  }
  entry.count += 1
  ipHits.set(ip, entry)
  if (entry.count > RATE_MAX) {
    return res.status(429).json({ error: 'Too many requests, slow down.' })
  }
  next()
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const trimmed = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'agentronics-enterprise', timestamp: new Date().toISOString() })
})

app.post('/api/waitlist', rateLimit, async (req, res) => {
  const name = trimmed(req.body?.name, 200)
  const email = trimmed(req.body?.email, 320).toLowerCase()
  const business = trimmed(req.body?.business, 500)

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' })
  }

  try {
    await sql`
      INSERT INTO waitlist (name, email, business)
      VALUES (${name}, ${email}, ${business})
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        business = EXCLUDED.business
    `
    res.json({ success: true })
  } catch (err) {
    console.error('DB error:', err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.use((err, _req, res, _next) => {
  if (err?.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Origin not allowed' })
  }
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

initDB().then(() => {
  app.listen(env.PORT, () => console.log(`API server running on http://localhost:${env.PORT}`))
})
