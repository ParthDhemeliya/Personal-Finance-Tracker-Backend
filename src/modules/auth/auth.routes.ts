import { Router } from 'express';
import { signup, login, getUser, deleteUser } from './auth.controller';
import protect from './auth.middleware';
import { validate } from '../../utils/validate';
import { loginSchema, signupSchema } from './auth.validator';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/user', protect, getUser);
router.delete('/user', protect, deleteUser);

export default router;
