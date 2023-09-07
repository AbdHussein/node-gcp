import { boolean, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  email: varchar('email', { length: 256 }),
  password: varchar('password', { length: 256 }),
  deleted: boolean('deleted').default(false),
});

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // i
