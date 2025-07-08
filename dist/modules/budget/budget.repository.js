// Adjust the import path if necessary, or create the Budget model if it doesn't exist
import Budget from '../../../models/Budget';
export const findBudgetsByUser = async (userId) => {
    return Budget.find({ user: userId });
};
export const createBudget = async (budget) => {
    return Budget.create(budget);
};
export const updateBudget = async (id, userId, data) => {
    return Budget.findOneAndUpdate({ _id: id, user: userId }, data, {
        new: true,
    });
};
export const deleteBudget = async (id, userId) => {
    return Budget.findOneAndDelete({ _id: id, user: userId });
};
