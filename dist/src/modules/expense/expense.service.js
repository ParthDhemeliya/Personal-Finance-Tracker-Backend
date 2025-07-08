import { ExpenseRepository } from './expense.repository';
import { AppError } from '../../utils/error/AppError';
import { Types } from 'mongoose';
import Transaction from '../../../models/Transaction';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeAmount(expense) {
    const obj = expense.toObject();
    return {
        ...obj,
        amount: parseFloat(expense.amount.toString()),
    };
}
export const ExpenseService = {
    createExpense: async (data, userId) => {
        const created = await ExpenseRepository.create({ ...data, user: userId });
        return normalizeAmount(created);
    },
    getAllExpenses: async (userId) => {
        const expenses = await ExpenseRepository.findAllByUser(userId);
        return expenses.map(normalizeAmount);
    },
    updateExpense: async (id, data, userId) => {
        const updated = await ExpenseRepository.updateByUser(id, data, userId);
        if (!updated)
            throw new AppError('Expense not found', 404);
        return normalizeAmount(updated);
    },
    deleteExpense: async (id, userId) => {
        const deleted = await ExpenseRepository.softDeleteByUser(id, userId);
        if (!deleted)
            throw new AppError('Expense not found', 404);
        return deleted;
    },
    getPaginatedExpenses: async (page, limit, userId) => {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            ExpenseRepository.findPaginatedByUser(userId, skip, limit),
            ExpenseRepository.countByUser(userId),
        ]);
        return {
            data: data.map(normalizeAmount),
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    },
    calculateTotalAmount: async (userId) => {
        const result = await Transaction.aggregate([
            {
                $match: {
                    user: new Types.ObjectId(userId),
                    isDeleted: false,
                    type: 'expense',
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' },
                },
            },
        ]);
        // Convert Decimal128 to number safely
        const rawTotal = result[0]?.total;
        const total = rawTotal ? parseFloat(rawTotal.toString()) : 0;
        return { total };
    },
};
