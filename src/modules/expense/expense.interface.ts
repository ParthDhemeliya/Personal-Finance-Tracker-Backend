import { Types } from 'mongoose';
import { z } from 'zod';
import { ExpenseSchema } from './expense.validator';

export type ExpenseInput = z.infer<typeof ExpenseSchema> & {
  expenseCategory: Types.ObjectId;
  user: Types.ObjectId | string;
  type?: string;
};
