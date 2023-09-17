import { eq } from 'drizzle-orm';
import DB from '../db/pg';
import { NewUser, users } from '../models/users.model';
import { Context } from '../types/context';
import logger from '../utils/logger.util';

export const getUserByEmail = (email: string, ctx: Context, includePassword = false) => {
  logger.http({
    req_id: ctx.request_id,
    route: ctx.url,
    message: `Getting the user details for ${email}`,
  });
  return DB.client
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      ...(includePassword ? { password: users.password } : {}),
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.email, email));
};

export const createNewUser = (user: NewUser) => {
  return DB.client
    .insert(users)
    .values({
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    })
    .returning({
      id: users.id,
      name: users.fullName,
      email: users.email,
    });
};
