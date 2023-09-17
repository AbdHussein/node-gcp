import { NextFunction, Request, Response } from 'express';
import { getUserByEmail } from '../services/users.service';
import { verifyToken } from '../utils';
import { comparePassword } from '../utils/crypto.util';
import logger from '../utils/logger.util';

export const checkPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.http({
      req_id: req.request_id,
      route: req.url,
      message: 'Checking password',
    });
    const user = await getUserByEmail(
      req.body.email,
      {
        request_id: req.request_id,
        url: req.url,
      },
      true,
    );
    if (user.length === 0) throw new Error('User not found');
    await comparePassword(req.body.password, user[0].password!);
    return next();
  } catch (error) {
    logger.error({
      req_id: req.request_id,
      route: req.url,
      message: 'Password check failed',
      error,
    });
    return res.status(401).json({ error });
  }
};

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.http({
      req_id: req.request_id,
      route: req.url,
      message: 'Validating token',
    });

    const authHeader = req.headers.authorization;

    if (!authHeader) throw new Error('Authorization header not found');

    if (!authHeader.startsWith('Bearer ')) throw new Error('Invalid token');

    const token = authHeader.split(' ')[1];
    if (!token) throw new Error('Token not found');

    const payload = await verifyToken(token);
    if (!payload) throw new Error('Invalid token');

    req.user = payload;

    return next();
  } catch (error) {
    logger.error({
      req_id: req.request_id,
      route: req.url,
      message: 'Token validation failed',
      error,
    });
    return res.status(401).json({ error });
  }
};
