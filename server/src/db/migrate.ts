import path from 'node:path'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { env } from '../lib/env'

const MAX_ATTEMPTS = 10
const RETRY_DELAY_MS = 2000

async function main() {
  const client = postgres(env.DATABASE_URL, { max: 1 })
  const db = drizzle(client)
  const migrationsFolder = path.join(__dirname, 'migrations')

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await migrate(db, { migrationsFolder })
      console.log('Migrations applied successfully')
      break
    } catch (error) {
      if (attempt === MAX_ATTEMPTS) throw error
      console.log(`Database not ready (attempt ${attempt}/${MAX_ATTEMPTS}), retrying in ${RETRY_DELAY_MS}ms...`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
    }
  }

  await client.end()
}

main().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
