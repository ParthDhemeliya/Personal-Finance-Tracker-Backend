import { IncomeSchema } from './income.validator.js';
export const validateIncome = (req, res, next) => {
    const result = IncomeSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            message: result.error.errors[0].message,
        });
        return;
    }
    req.body = result.data;
    next();
};
