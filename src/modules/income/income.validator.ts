
import { z } from "zod";

export const IncomeSchema = z.object({
  amount: z.number().positive(),
  date: z.string(),
  description: z.string().optional(),
  paymentMethod: z.enum(["cash", "card", "bank_transfer", "other"]),
  currency: z.string().length(3),
  incomeSource: z.string().min(1),
});