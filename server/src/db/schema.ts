import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  originalUrl: text('original_url').notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  accessCount: integer('access_count').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
