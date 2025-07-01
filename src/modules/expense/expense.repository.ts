import { Types } from 'mongoose';
import Transaction from '../../../models/Transaction';
import { ExpenseInput } from './expense.interface';

export const ExpenseRepository = {
  create: async (data: ExpenseInput & { user: string }) => {
    return Transaction.create({
      ...data,
      expenseCategory: data.categoryId,
      customExpenseCategory: data.customCategory,
      user: data.user,
      type: 'expense',
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
      updateData.customExpenseCategory = undefined;
    } else if (data.customCategory) {
      updateData.customExpenseCategory = data.customCategory;
      updateData.expenseCategory = undefined;
    }
    // Optional safety
    updateData.type = 'expense';

    return Transaction.findByIdAndUpdate(id, updateData, { new: true });
  },
  softDelete: async (id: string) => {
    return Transaction.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  },
  findPaginatedByUser: async (userId: string, skip: number, limit: number) => {
    return Transaction.find({
      user: userId,
      type: 'expense',
      isDeleted: false,
    })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
  },

  // New: Count total expenses for user
  countByUser: async (userId: string) => {
    return Transaction.countDocuments({
      user: userId,
      type: 'expense',
      isDeleted: false,
    });
  },

  // New: Total expense amount
  calculateTotalAmount: async (userId: string) => {
    const result = await Transaction.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
          isDeleted: false,
          type: 'expense', // ✅ only include expense transactions
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }, // ✅ sum of amounts
        },
      },
    ]);

    return { total: result[0]?.total || 0 };
  },
};
