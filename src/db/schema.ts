import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const locations = sqliteTable('locations', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  lat: real('lat').notNull(),
  lon: real('lon').notNull(),
  metrics: text('metrics').default('temp').notNull(),
  active: integer('active').default(1).notNull(),
  createdAt: text('created_at')
    .default(sql`current_timestamp`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`current_timestamp`)
    .notNull(),
});
