import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { json } from 'stream/consumers';

// Get all Income transactions
export const getAllIncomes = asyncHandler(async (req: any, res: any) => {
  const incomes = await Transaction.find({
    user: req.user._id,
    type: 'income',
  }).sort({ data: -1 });
  res.status(200).json(incomes);
});

// Create new income
export const createIncome = asyncHandler(async (req: any, res: any) => {
  const { amount, category, date, description } = req.body;

  if (!amount || !category || !date) {
    res.status(400);
    throw new Error('amount, category, and date are required.');
  }

  const income = await Transaction.create({
    type: 'income',
    amount,
    category,
    date,
    description,
    user: req.user._id,
  });
  res.status(201).json(income);
});

// Update income
export const updateIncome = asyncHandler(async (req: any, res: any) => {
  const income = await Transaction.findOne({
    _id: req.params.id,
    user: req.user._id,
    type: 'income',
  });

  if (!income) {
    res.status(404);
    throw new Error('Income not found.');
  }

  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updated);
});

// Delete income
export const deleteIncome = asyncHandler(async (req: any, res: any) => {
  const income = await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
    type: 'income',
  });

  if (!income) {
    res.status(404);
    throw new Error('Income not found.');
  }

   res.status(200).json({ message: "Income deleted successfully" });
});
