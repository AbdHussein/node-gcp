import express, { Request, Response } from 'express';
import { requestMiddleware } from './middlewares';
import router from './routes';
import logger from './utils/logger.util';
import swaggerDocs from './utils/swagger.util';

const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.set('trust proxy', true);

app.use(express.json());

app.use(requestMiddleware);

app.get('/', (req: Request, res: Response) => {
  return res.send(req.request_id);
});

app.use('/api/v1', router);

swaggerDocs(app, PORT);

app.use('*', (req: Request, res: Response) => {
  logger.warn({
    route: req.url,
    message: 'Resource not found',
  });
  return res.status(404).json({
    status: 'error',
    message: 'resource not found',
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

export { app, server };
