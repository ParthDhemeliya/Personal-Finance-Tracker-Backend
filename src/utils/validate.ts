import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './error/AppError';

export const validate =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (schema: z.ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors = error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          }));
          return next(new AppError('Validation error', 400, formattedErrors));
        }

        return next(new AppError('Unknown validation error', 400));
      }
    };
