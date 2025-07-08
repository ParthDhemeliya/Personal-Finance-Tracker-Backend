import * as TransactionService from './transaction.service';
export const getRecentTransactions = async (req, res, next) => {
    const userId = req.user?._id?.toString();
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const limit = parseInt(req.query.limit) || 5;
    try {
        const transactions = await TransactionService.getRecentTransactions(userId, limit);
        res.status(200).json(transactions);
    }
    catch (err) {
        next(err);
    }
};
