import express from 'express';
import {
  createIncome,
  deleteIncome,
  getAllIncomes,
  updateIncome,
} from './income.controller';
import { validateIncome } from './income.validator.middleware';
import validateObjectId from '../../utils/validateObjectId';
import protect from '../auth/auth.middleware';

const router = express.Router();

router.use(protect);

router.post('/', validateIncome, createIncome);
router.get('/', getAllIncomes);
router.put('/:id', validateObjectId, validateIncome, updateIncome);
router.delete('/:id', validateObjectId, deleteIncome);

export default router;
