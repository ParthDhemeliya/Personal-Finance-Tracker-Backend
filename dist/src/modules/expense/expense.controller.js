import { ExpenseRepository } from './expense.repository';
// GET /api/v1/expenses/category-summary?month=YYYY-MM
export const getCategorySummary = async (req, res, next) => {
    try {
        const userId = req.user?._id?.toString();
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { month } = req.query;
        if (!month || typeof month !== 'string') {
            res
                .status(400)
                .json({ message: 'Invalid or missing month. Use YYYY-MM format.' });
            return;
        }
        const summary = await ExpenseRepository.getCategorySummaryByMonth(userId, month);
        res.json(summary);
    }
    catch (error) {
        next(error);
    }
};
// (Removed duplicate import)
import { ExpenseService } from './expense.service';
export const createExpense = async (req, res, next) => {
    const userId = req.user?._id?.toString();
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const data = req.body;
        const result = await ExpenseService.createExpense(data, userId);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const getAllExpenses = async (req, res, next) => {
    const userId = req.user?._id?.toString();
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const result = await ExpenseService.getAllExpenses(userId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
export const updateExpense = async (req, res, next) => {
    const userId = req.user?._id?.toString();
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const result = await ExpenseService.updateExpense(req.params.id, req.body, userId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteExpense = async (req, res, next) => {
    const userId = req.user?._id?.toString();
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        await ExpenseService.deleteExpense(req.params.id, userId);
        res.status(204).json({ message: 'Deleted' });
    }
    catch (error) {
        next(error);
    }
};
export const getPaginatedExpenses = async (req, res, next) => {
    try {
        const userId = req.user?._id?.toString();
        if (!userId) {
            {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const result = await ExpenseService.getPaginatedExpenses(page, limit, userId);
        res.status(200).json(result);
    }
    catch (err) {
        console.error('Error in getPaginatedExpenses controller:', err);
        next(err);
    }
};
export const getTotalExpense = async (req, res, next) => {
    const userId = req.user?._id?.toString();
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const total = await ExpenseService.calculateTotalAmount(userId);
        res.json(total);
    }
    catch (error) {
        next(error);
    }
};
