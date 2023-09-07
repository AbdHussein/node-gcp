import type { Config } from 'drizzle-kit';
import env from './config/environment';

export default {
  schema: './models/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: env.db.host as string,
    port: Number(env.db.port),
    user: env.db.user as string,
    password: env.db.password as string,
    database: env.db.name as string,
  },
} satisfies Config;
