import { type Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DB_URL is not set');

export default {
  out: './migrations',
  schema: './src/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
