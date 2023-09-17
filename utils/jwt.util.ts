import jwt from 'jsonwebtoken';
import config from '../config/environment';
import { Context } from '../types/context';
import { User } from '../types/user';
import logger from './logger.util';

export const generateToken = (payload: object, ctx: Context): Promise<string> => {
  logger.http({
    req_id: ctx.request_id,
    route: ctx.url,
    message: 'Generating token',
  });
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.jwt.secretKey as string,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) return reject(err);
        if (!token) return reject(new Error('Token not generated'));
        return resolve(token);
      },
    );
  });
};

export const verifyToken = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secretKey as string, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded as User);
    });
  });
};
