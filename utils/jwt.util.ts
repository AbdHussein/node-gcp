import jwt from 'jsonwebtoken';
import config from '../config/environment';

export const generateToken = (payload: any): Promise<string> => {
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

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secretKey as string, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
};
