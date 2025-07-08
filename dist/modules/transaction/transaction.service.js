import * as TransactionRepo from './transaction.repository';
export const getRecentTransactions = async (userId, limit) => {
    return TransactionRepo.findRecentTransactions(userId, limit);
};
// Add more service methods as needed (create, update, delete, etc.)
