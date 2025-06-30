// import z from 'zod';

// const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// export const IncomeSchema = z.object({
//   amount: z.number().positive(),
//   date: z.string(),
//   description: z.string().optional(),
//   paymentMethod: z.enum(['cash', 'card', 'bank_transfer', 'other']),
//   currency: z.string().length(3),

//   //  Accept either valid ObjectId or custom string
//   incomeSource: z
//     .string()
//     .min(1, 'Income source is required')
//     .refine(
//       (val) => objectIdRegex.test(val) || val.length > 1,
//       'Must be a valid category ID or custom name',
//     ),
// });

import z from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const IncomeSchema = z
  .object({
    amount: z.number().positive(),
    date: z.string(),
    description: z.string().optional(),
    paymentMethod: z.enum(['cash', 'card', 'bank_transfer', 'other']),
    currency: z.string().length(3),

    incomeSource: z.string().trim().nullable().optional(), // allow null or string
    customIncomeSource: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      // at least one must be provided
      return (
        (data.incomeSource && objectIdRegex.test(data.incomeSource)) ||
        (data.customIncomeSource && data.customIncomeSource.length > 1)
      );
    },
    {
      message: 'Either a valid incomeSource or customIncomeSource is required',
      path: ['incomeSource'],
    },
  );
