import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import logger from '../utils/logger.util';

export const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.request_id = v4();
  logger.http({
    req_id: req.request_id,
    route: req.url,
  });
  next();
};
