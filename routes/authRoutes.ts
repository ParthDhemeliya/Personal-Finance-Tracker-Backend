import { Router } from 'express';
import { signup, login, getUser, deleteUser } from '../controllers/authController';
import protect from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', signup); 
router.post('/login', login);
router.get('/user', protect, getUser);
router.delete('/user', protect, deleteUser);

export default router;