import detenv from 'dotenv';
import * as yup from 'yup';

detenv.config();

yup
  .object()
  .shape({
    DB_HOST: yup.string().required(),
    DB_PORT: yup.string().required(),
    DB_NAME: yup.string().required(),
    DB_USER: yup.string().required(),
    DB_PASSWORD: yup.string().required(),
    JWT_SECRET_KEY: yup.string().required(),
  })
  .strict()
  .validateSync(process.env, {
    abortEarly: true,
  });

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, JWT_SECRET_KEY } = process.env;

const config = {
  db: {
    host: DB_HOST,
    port: DB_PORT,
    name: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  },
  jwt: {
    secretKey: JWT_SECRET_KEY,
  },
};

export default config;
