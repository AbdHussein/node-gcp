import { NextFunction, Request, Response } from 'express';
import { getUserByEmail } from '../services/users.service';
import { verifyToken } from '../utils';
import { comparePassword } from '../utils/crypto.util';

export const checkPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserByEmail(req.body.email, true);
    if (user.length === 0) throw new Error('User not found');
    await comparePassword(req.body.password, user[0].password!);
    return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new Error('Authorization header not found');

    if (!authHeader.startsWith('Bearer ')) throw new Error('Invalid token');

    const token = authHeader.split(' ')[1];
    if (!token) throw new Error('Token not found');

    const payload = await verifyToken(token);
    if (!payload) throw new Error('Invalid token');

    // @ts-ignore
    req.user = payload;

    return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};
