import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import dotenv from 'dotenv';

dotenv.config();

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized, token missing' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id).select('-password'); //from repo

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }
    //reuser  res.status
    req.user = user;
    next();
  } catch (err: unknown) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
export default protect;
