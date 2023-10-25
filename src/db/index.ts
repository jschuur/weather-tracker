import { createClient, type Config } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const dbUrl = process.env.DATABASE_URL;
const dbAuthToken = process.env.DATABASE_AUTH_TOKEN;

if (!dbUrl) throw new Error('DATABASE_URL is not set');

const config: Config = { url: dbUrl };

if (!dbUrl.startsWith('file:') && !dbAuthToken) throw new Error('DATABASE_AUTH_TOKEN is not set');
else if (dbAuthToken) config.authToken = dbAuthToken;

const client = createClient(config);

export const db = drizzle(client);
