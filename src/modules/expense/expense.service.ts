import { ExpenseInput } from './expense.interface';
import { ExpenseRepository } from './expense.repository';
import { AppError } from '../../utils/error/AppError';

function normalizeAmount(expense: any) {
  const obj = expense.toObject();
  return {
    ...obj,
    amount: parseFloat(expense.amount.toString()),
  };
}

export const ExpenseService = {
  createExpense: async (data: ExpenseInput, userId: string) => {
    const created = await ExpenseRepository.create({ ...data, user: userId });
    return normalizeAmount(created);
  },

  getAllExpenses: async (userId: string) => {
    const expenses = await ExpenseRepository.findAllByUser(userId);
    return expenses.map(normalizeAmount);
  },

  updateExpense: async (id: string, data: Partial<ExpenseInput>) => {
    const updated = await ExpenseRepository.update(id, data);
    if (!updated) throw new AppError('Expense not found', 404);
    return normalizeAmount(updated);
  },

  deleteExpense: async (id: string) => {
    const deleted = await ExpenseRepository.softDelete(id);
    if (!deleted) throw new AppError('Expense not found', 404);
    return deleted;
  },
};
