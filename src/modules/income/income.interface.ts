import { Types } from 'mongoose';
import { z } from 'zod';
import { IncomeSchema } from './income.validator';

export type IncomeInput = z.infer<typeof IncomeSchema> & {
  incomeSource: Types.ObjectId;
  user: Types.ObjectId;
  type?: string;
};
