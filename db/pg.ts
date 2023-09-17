import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import config from '../config/environment';
import logger from '../utils/logger.util';

class DB {
  client: ReturnType<typeof drizzle>;

  constructor() {
    const { db } = config;
    const options = {
      database: db.name,
      username: db.user,
      password: db.password,
      host: db.host,
      port: Number(db.port) || 5432,
    };

    this.client = drizzle(postgres(options));

    this.client
      .execute(sql`SELECT 1;`)
      .then(() => {
        logger.info('Database connection established');
      })
      .catch((err) => {
        logger.fatal('Database connection failed', err);
        process.exit(1);
      });
  }
}

export default new DB();
