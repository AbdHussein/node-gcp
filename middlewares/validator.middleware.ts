import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import logger from '../utils/logger.util';

export const validator =
  (schema: yup.ObjectSchema<object>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.http({
        req_id: req.request_id,
        route: req.url,
        message: 'Validating request body',
      });
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (error) {
      logger.error({
        req_id: req.request_id,
        route: req.url,
        message: 'Validation failed',
        error,
      });
      return res.status(400).json(error);
    }
  };
