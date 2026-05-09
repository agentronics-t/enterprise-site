import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const sql = neon(process.env.DATABASE_URL)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const trimmed = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body || {}
  const name = trimmed(body.name, 200)
  const email = trimmed(body.email, 320).toLowerCase()
  const business = trimmed(body.business, 500)

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' })
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        business TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `
    await sql`
      INSERT INTO waitlist (name, email, business)
      VALUES (${name}, ${email}, ${business})
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        business = EXCLUDED.business
    `
    return res.json({ success: true })
  } catch (err) {
    console.error('DB error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
