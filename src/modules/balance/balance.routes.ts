import { Router } from 'express';
import { getBalance } from './balance.controller';
import protect from '../auth/auth.middleware';

const router = Router();

router.use(protect);
router.get('/', getBalance);

export default router;
