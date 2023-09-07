import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

export const validator = (schema: yup.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
