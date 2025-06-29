import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IUserDocument } from '../../../models/User';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AuthService.signup(req.body);
    res.status(201).json(result);
  } catch (err: unknown) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json(result);
  } catch (err: unknown) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const userId = (req.user as IUserDocument)._id.toString();
    const user = await AuthService.getUser(userId);
    res.status(200).json(user);
  } catch (err: unknown) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const userId = (req.user as IUserDocument)._id.toString();
    await AuthService.deleteUser(userId);
    res.status(204).send();
  } catch (err: unknown) {
    next(err);
  }
};
