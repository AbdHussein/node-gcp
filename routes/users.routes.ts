import { Router } from 'express';
import { createUser, getUserDetails, loginUser } from '../controllers/users.controller';
import { checkPassword, validateToken } from '../middlewares/auth.middleware';
import { validator } from '../middlewares/validator.middleware';
import { createUserSchema, loginUserSchema } from '../schema/users.schema';

const router = Router();
router.post('/login', validator(loginUserSchema), checkPassword, loginUser);
router.post('/register', validator(createUserSchema), createUser);
router.get('/me', validateToken, getUserDetails);

export default router;
