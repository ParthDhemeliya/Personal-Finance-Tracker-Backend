import { Request, Response, NextFunction } from 'express';
import { ExpenseService } from './expense.service';
import { ExpenseInput } from './expense.interface';

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id?.toString();
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const data: ExpenseInput = req.body;
    const result = await ExpenseService.createExpense(data, userId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id?.toString();
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const result = await ExpenseService.getAllExpenses(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ExpenseService.updateExpense(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await ExpenseService.deleteExpense(req.params.id);
    res.status(204).json({ message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

export const getPaginatedExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const result = await ExpenseService.getPaginatedExpenses(
      page,
      limit,
      userId,
    );

    res.status(200).json(result);
  } catch (err) {
    console.error('Error in getPaginatedExpenses controller:', err);
    next(err);
  }
};

export const getTotalExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id?.toString();
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const total = await ExpenseService.calculateTotalAmount(userId);
    res.json(total);
  } catch (error) {
    next(error);
  }
};
