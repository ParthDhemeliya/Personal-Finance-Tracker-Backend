import { Router } from 'express';
import { getRecentTransactions } from './transaction.controller';
import protect from '../auth/auth.middleware';
const router = Router();
router.use(protect);
router.get('/recent', getRecentTransactions);
export default router;
