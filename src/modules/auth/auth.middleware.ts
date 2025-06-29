import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import dotenv from 'dotenv';
import { AppError } from '../../utils/error/AppError';

dotenv.config();

const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('Not authorized, token missing', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    req.user = user;
    next();
  } catch {
    return next(new AppError('Invalid or expired token', 401));
  }
};

export default protect;
