// src/modules/expense/expense.routes.ts
import express from 'express';
import {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getPaginatedExpenses,
  getTotalExpense,
} from './expense.controller';
import protect from '../auth/auth.middleware';
import { validate } from '../../utils/validate';
import { ExpenseSchema } from './expense.validator';
// import authMiddleware from '../auth/auth.middleware';

const router = express.Router();

router.use(protect);

router.get('/paginated', protect, getPaginatedExpenses);
router.get('/total', getTotalExpense);

router.post('/', validate(ExpenseSchema), createExpense);
router.get('/', getAllExpenses);
router.put('/:id', validate(ExpenseSchema), updateExpense);
router.delete('/:id', deleteExpense);

export default router;
