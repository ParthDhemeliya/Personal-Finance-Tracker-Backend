// src/modules/expense/expense.routes.ts
import express from 'express';
import {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} from './expense.controller';
import protect from '../auth/auth.middleware';
import { validate } from '../../utils/validate';
import { ExpenseSchema } from './expense.validator';

const router = express.Router();

router.use(protect);

router.post('/', validate(ExpenseSchema), createExpense);
router.get('/', getAllExpenses);
router.put('/:id', validate(ExpenseSchema.partial()), updateExpense);
router.delete('/:id', deleteExpense);

export default router;
