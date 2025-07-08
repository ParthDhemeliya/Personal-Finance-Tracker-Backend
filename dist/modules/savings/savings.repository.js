import SavingsGoal from '../../../models/SavingsGoal';
export const findSavingsGoalByUser = async (userId) => {
    return SavingsGoal.findOne({ user: userId });
};
export const createSavingsGoal = async (goal) => {
    return SavingsGoal.create(goal);
};
