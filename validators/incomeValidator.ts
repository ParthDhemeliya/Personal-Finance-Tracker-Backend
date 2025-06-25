import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define the schema
const incomeSchema = Joi.object({
  type: Joi.string().valid("income").required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  description: Joi.string().allow("", null),
});

// Middleware to validate body
export const validateIncome = (req: Request, res: Response, next: NextFunction) => {
  const { error } = incomeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
