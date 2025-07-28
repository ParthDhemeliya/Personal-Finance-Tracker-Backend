import * as SavingsRepo from './savings.repository.js';
export const getSavingsGoal = async (userId) => {
    return SavingsRepo.findSavingsGoalByUser(userId);
};
export const createSavingsGoal = async (goal) => {
    return SavingsRepo.createSavingsGoal(goal);
};
