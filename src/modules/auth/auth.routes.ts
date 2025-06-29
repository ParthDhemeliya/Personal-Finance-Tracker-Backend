import { Router } from 'express';
import { signup, login, getUser, deleteUser } from './auth.controller';
import protect from './auth.middleware';
import { validate } from '../../utils/validate';
import { LoginSchema, SignupSchema } from './auth.validator';

const router = Router();

router.post('/signup', validate(SignupSchema), signup);
router.post('/login', validate(LoginSchema), login);
router.get('/user', protect, getUser);
router.delete('/user', protect, deleteUser);

export default router;
