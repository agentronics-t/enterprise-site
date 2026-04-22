import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { neon } from '@neondatabase/serverless'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const sql = neon(process.env.DATABASE_URL)

// Create table on startup
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

app.post('/api/waitlist', async (req, res) => {
  const { name, email, business } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  try {
    await sql`
      INSERT INTO waitlist (name, email, business)
      VALUES (${name}, ${email}, ${business || ''})
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

initDB().then(() => {
  app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`))
})
