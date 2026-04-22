import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, business } = req.body || {}
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
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
      VALUES (${name}, ${email}, ${business || ''})
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
