import * as BudgetRepo from './budget.repository';
export const getBudgets = async (userId) => {
    return BudgetRepo.findBudgetsByUser(userId);
};
export const createBudget = async (budget) => {
    return BudgetRepo.createBudget(budget);
};
export const updateBudget = async (id, userId, data) => {
    return BudgetRepo.updateBudget(id, userId, data);
};
export const deleteBudget = async (id, userId) => {
    return BudgetRepo.deleteBudget(id, userId);
};
