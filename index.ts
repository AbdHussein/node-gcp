import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { uuid } from 'uuidv4';
import router from './routes';
import swaggerDocs from './utils/swagger.util';

const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.set('trust proxy', true);

app.use(express.json());

app.use((req: Request, res: Response, next) => {
  // @ts-ignore
  req.id = uuid();
  next();
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/api/v1', router);

swaggerDocs(app, PORT);

app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({
    status: 'error',
    message: 'resource not found',
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

export { app, server };
