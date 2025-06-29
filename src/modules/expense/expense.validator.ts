import { z } from 'zod';

export const ExpenseSchema = z.object({
  type: z.literal('expense'),
  amount: z.number().positive(),
  currency: z.string().length(3),
  paymentMethod: z.enum(['cash', 'card', 'bank_transfer', 'other']),
  categoryId: z.string().min(1, 'Category is required'),
  date: z.string(),
  description: z.string().optional(),
});
