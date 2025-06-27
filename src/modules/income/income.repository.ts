import Transaction from '../../../models/Transaction';
import { IncomeInput } from './income.interface';

export const IncomeRepository = {
  // Create a new income transaction
  create: async (data: IncomeInput) => {
    return Transaction.create(data);
  },

  // Fetch all incomes by user ID
  findAllByUser: async (userId: string) => {
    return Transaction.find({ user: userId, type: 'income' })
      .populate('incomeSource', 'name color')
      .sort({ date: -1 });
  },
  // Update income by ID and user ID
  updateById: async (
    id: string,
    userId: string,
    updates: Partial<IncomeInput>,
  ) => {
    const result = await Transaction.findOneAndUpdate(
      { _id: id, user: userId, type: 'income' },
      updates,
      { new: true },
    );
    return result;
  },

  // Delete income by ID and user ID
  deleteById: async (id: string, userId: string) => {
    const result = await Transaction.findOneAndDelete({
      _id: id,
      user: userId,
      type: 'income',
    });
    return result;
  },
};
