import { Types } from 'mongoose';
import Transaction from '../../../models/Transaction';
export const ExpenseRepository = {
    getCategorySummaryByMonth: async (userId, month) => {
        if (!/^\d{4}-\d{2}$/.test(month)) {
            throw new Error('Invalid month format. Use YYYY-MM.');
        }
        const start = new Date(`${month}-01T00:00:00.000Z`);
        const end = new Date(start);
        end.setMonth(end.getMonth() + 1);
        const summary = await Transaction.aggregate([
            {
                $match: {
                    user: new Types.ObjectId(userId),
                    type: 'expense',
                    isDeleted: { $ne: true },
                    date: { $gte: start, $lt: end },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'expenseCategory',
                    foreignField: '_id',
                    as: 'categoryInfo',
                },
            },
            {
                $unwind: {
                    path: '$categoryInfo',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: {
                        $ifNull: [
                            { $ifNull: ['$categoryInfo.name', '$customExpenseCategory'] },
                            'Uncategorized',
                        ],
                    },
                    amount: { $sum: '$amount' },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    amount: 1,
                },
            },
        ]);
        // Convert amount to number and ensure category is string
        return summary.map((item) => ({
            category: item.category ?? 'Uncategorized',
            amount: typeof item.amount === 'object' &&
                item.amount !== null &&
                item.amount.toString
                ? parseFloat(item.amount.toString())
                : item.amount,
        }));
    },
    create: async (data) => {
        return Transaction.create({
            ...data,
            expenseCategory: data.categoryId,
            customExpenseCategory: data.customCategory,
            user: data.user,
            type: 'expense',
        });
    },
    findAllByUser: async (userId) => {
        return Transaction.find({
            user: userId,
            type: 'expense',
            isDeleted: false,
        }).sort({ date: -1 });
    },
    findById: async (id) => {
        return Transaction.findOne({ _id: id, type: 'expense', isDeleted: false });
    },
    update: async (id, data) => {
        const updateData = { ...data };
        if (data.categoryId) {
            updateData.expenseCategory = data.categoryId;
            updateData.customExpenseCategory = undefined;
        }
        else if (data.customCategory) {
            updateData.customExpenseCategory = data.customCategory;
            updateData.expenseCategory = undefined;
        }
        // Optional safety
        updateData.type = 'expense';
        return Transaction.findByIdAndUpdate(id, updateData, { new: true });
    },
    softDelete: async (id) => {
        return Transaction.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    },
    findPaginatedByUser: async (userId, skip, limit) => {
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
    countByUser: async (userId) => {
        return Transaction.countDocuments({
            user: userId,
            type: 'expense',
            isDeleted: false,
        });
    },
    // New: Total expense amount
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
        console.log('[DEBUG] Aggregate result:', result);
        return { total: result[0]?.total || 0 };
    },
    updateByUser: async (id, data, userId) => {
        return Transaction.findOneAndUpdate({ _id: id, user: userId, isDeleted: false }, data, { new: true });
    },
    softDeleteByUser: async (id, userId) => {
        return Transaction.findOneAndUpdate({ _id: id, user: userId, isDeleted: false }, { isDeleted: true }, { new: true });
    },
};
