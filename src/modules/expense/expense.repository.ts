import Transaction from '../../../models/Transaction';
import { ExpenseInput } from './expense.interface';

export const ExpenseRepository = {
  create: async (data: ExpenseInput & { user: string }) => {
    return Transaction.create({
      ...data,
      expenseCategory: data.categoryId,
      user: data.user,
    });
  },

  findAllByUser: async (userId: string) => {
    return Transaction.find({
      user: userId,
      type: 'expense',
      isDeleted: false,
    }).sort({ date: -1 });
  },

  findById: async (id: string) => {
    return Transaction.findOne({ _id: id, type: 'expense', isDeleted: false });
  },

  update: async (id: string, data: Partial<ExpenseInput>) => {
    const updateData: any = { ...data };
    if (data.categoryId) {
      updateData.expenseCategory = data.categoryId;
    }
    return Transaction.findByIdAndUpdate(id, updateData, { new: true });
  },

  softDelete: async (id: string) => {
    return Transaction.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  },
};
