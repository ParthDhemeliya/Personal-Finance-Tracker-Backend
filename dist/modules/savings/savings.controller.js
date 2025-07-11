import SavingsGoal from '../../../models/SavingsGoal';
import { getCurrentSavings } from './savings.current.service';
import { getSavingsGoal as getGoalService, createSavingsGoal as createGoalService, } from './savings.service';
import { savingsGoalSchema } from './savings.validator';
export const updateSavingsGoal = async (req, res, next) => {
    const userId = req.user?._id?.toString();
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const { amount, target } = req.body;
        const update = {};
        if (amount !== undefined)
            update.amount = amount;
        if (target !== undefined)
            update.amount = target;
        const goal = await SavingsGoal.findOneAndUpdate({ user: userId }, { $set: update }, { new: true, upsert: false });
        if (!goal) {
            res.status(404).json({ message: 'Goal not found' });
            return;
        }
        res.status(200).json(goal);
    }
    catch (err) {
        next(err);
    }
};
export const getCurrentSavingsController = async (req, res, next) => {
    const userId = req.user?._id?.toString();
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const current = await getCurrentSavings(userId);
        res.status(200).json({ current });
    }
    catch (err) {
        next(err);
    }
};
export const getSavingsGoal = async (req, res, next) => {
    const userId = req.user?._id?.toString();
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const [goal, current] = await Promise.all([
            getGoalService(userId),
            getCurrentSavings(userId),
        ]);
        res.status(200).json({
            user: userId,
            target: goal?.amount || 0,
            current: current || 0,
        });
    }
    catch (err) {
        next(err);
    }
};
export const createSavingsGoal = async (req, res, next) => {
    const userId = req.user?._id?.toString();
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const parsed = savingsGoalSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: 'Validation failed', errors: parsed.error.errors });
            return;
        }
        const goal = await createGoalService({ ...parsed.data, user: userId });
        res.status(201).json(goal);
    }
    catch (err) {
        next(err);
    }
};
