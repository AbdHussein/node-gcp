import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import config from '../config/environment';

class DB {
  client;

  constructor() {
    const { db } = config;
    const client = postgres({
      database: db.name,
      username: db.user,
      password: db.password,
      host: db.host,
      port: Number(db.port) || 5432,
    });

    this.client = drizzle(client, {
      logger: {
        logQuery(query, params) {
          console.log('SQL Query:', query, params);
        },
      },
    });
  }
}

export default new DB();
