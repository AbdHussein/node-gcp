import { Request, Response } from 'express';
import { createNewUser, getUserByEmail } from '../services/users.service';
import { generateToken } from '../utils';
import { hashPassword } from '../utils/crypto.util';
import logger from '../utils/logger.util';

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    logger.http({
      req_id: req.request_id,
      route: req.url,
      message: 'Getting the user details',
    });
    const user = req.user;
    const users = await getUserByEmail(user.email, {
      request_id: req.request_id,
      url: req.url,
    });
    if (users.length === 0) throw new Error('User not found');
    return res.status(200).json(users[0]);
  } catch (error) {
    logger.error({
      req_id: req.request_id,
      route: req.url,
      message: 'Failed to get the user details',
      error,
    });
    return res.status(500).json(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const data = await createNewUser({
      fullName: req.body.full_name,
      email: req.body.email,
      password: hashedPassword,
    });
    const token = await generateToken(
      {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
      },
      {
        request_id: req.request_id,
        url: req.url,
      },
    );
    return res.status(201).json({
      ...data[0],
      token,
    });
  } catch (error) {
    logger.error({
      req_id: req.request_id,
      route: req.url,
      message: 'Failed to create the user',
      error,
    });
    console.log({ error });
    return res.status(500).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    logger.http({
      req_id: req.request_id,
      route: req.url,
      message: 'Logging in the user',
    });
    const user = await getUserByEmail(req.body.email, {
      request_id: req.request_id,
      url: req.url,
    });
    if (user.length === 0) throw new Error('User not found');

    const token = await generateToken(
      {
        id: user[0].id,
        name: user[0].fullName,
        email: user[0].email,
      },
      {
        request_id: req.request_id,
        url: req.url,
      },
    );

    return res.status(200).json({
      ...user[0],
      token,
    });
  } catch (error) {
    logger.error({
      req_id: req.request_id,
      route: req.url,
      message: 'Failed to login the user',
      error,
    });
    return res.status(500).json(error);
  }
};
