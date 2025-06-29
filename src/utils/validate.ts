import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './error/AppError';

export const validate =
  (schema: ZodSchema<unknown>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((e) => e.message);
        return next(new AppError('Validation error', 400, messages));
      }
      return next(error);
    }
  };
