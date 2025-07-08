import Transaction from '../../../models/Transaction';
export const findRecentTransactions = async (userId, limit) => {
    return Transaction.find({ user: userId, isDeleted: false })
        .sort({ date: -1, createdAt: -1 })
        .limit(limit);
};
