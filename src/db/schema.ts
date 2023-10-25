import { sql } from 'drizzle-orm';
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const locations = sqliteTable('locations', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  metrics: blob('metrics', { mode: 'json' }).$type<string[]>(),
  enabled: integer('enabled').default(1).notNull(),
  createdAt: text('created_at')
    .default(sql`current_timestamp`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`current_timestamp`)
    .notNull(),
});
