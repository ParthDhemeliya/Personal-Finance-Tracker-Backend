import { Router } from 'express';
import { getCategories } from './category.controller';
import protect from '../auth/auth.middleware';
const router = Router();
router.use(protect);
router.get('/', getCategories);
export default router;
