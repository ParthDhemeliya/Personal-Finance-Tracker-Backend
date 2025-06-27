import { Request, Response } from 'express';
import { IncomeService } from './income.service';

export const getAllIncomes = async (req: Request, res: Response) => {
  const userId = req.user?._id?.toString();
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const incomes = await IncomeService.getIncomes(userId);
    res.status(200).json(incomes);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createIncome = async (req: Request, res: Response) => {
  const userId = req.user?._id?.toString();
  if (!userId) res.status(401).json({ message: 'Unauthorized' });

  try {
    const income = await IncomeService.createIncome({
      ...req.body,
      user: userId,
    });
    res.status(201).json(income);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIncome = async (req: Request, res: Response) => {
  const userId = req.user?._id?.toString();
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const updated = await IncomeService.updateIncome(
      req.params.id,
      userId,
      req.body,
    );
    if (!updated) {
      res.status(404).json({ message: 'Income not found.' });
      return;
    }
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteIncome = async (req: Request, res: Response) => {
  const userId = req.user?._id?.toString();
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const deleted = await IncomeService.deleteIncome(req.params.id, userId);
    if (!deleted) {
      res.status(404).json({ message: 'Income not found.' });
      return;
    }
    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
