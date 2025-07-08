import express from 'express';
import {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getPaginatedExpenses,
  getTotalExpense,
  getCategorySummary,
} from './expense.controller';
import { getExpenseStats } from './expense.stats.controller';
import protect from '../auth/auth.middleware';
import { validate } from '../../utils/validate';
import { ExpenseSchema } from './expense.validator';

const router = express.Router();

router.use(protect);
router.get('/paginated', protect, getPaginatedExpenses);
router.get('/total', getTotalExpense);
router.get('/category-summary', getCategorySummary);

router.get('/stats', getExpenseStats);

router.post('/', validate(ExpenseSchema), createExpense);
router.get('/', getAllExpenses);
router.put('/:id', validate(ExpenseSchema), updateExpense);
router.delete('/:id', deleteExpense);

export default router;
