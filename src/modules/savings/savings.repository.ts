import SavingsGoal from '../../../models/SavingsGoal';
import { ISavingsGoal } from './savings.interface';

export const findSavingsGoalByUser = async (userId: string) => {
  return SavingsGoal.findOne({ user: userId });
};

export const createSavingsGoal = async (goal: ISavingsGoal) => {
  return SavingsGoal.create(goal);
};
