import { Router } from 'express';
import UsersRouter from './users.routes';

const router = Router();

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *      - Healthcheck
 *       description: Responds if the app is up and running
 *       responses:
 *        200:
 *         description: App is up and running
 */
router.get('/health-check', (req, res) => {
  res.send('Hello World!');
});

/**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.use('/users', UsersRouter);

export default router;
