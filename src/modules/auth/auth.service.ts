import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthRepository } from './auth.repository';
import { AuthRequestBody, SignupRequestBody } from './auth.interface';

dotenv.config();

export const AuthService = {
  signup: async (data: SignupRequestBody) => {
    const existingUser = await AuthRepository.findByEmail(data.email);
    if (existingUser) throw new Error('User already exists');
    const user = await AuthRepository.createUser(data);
    return {
      token: AuthService.generateToken(user?._id.toString()),
    };
  },

  login: async (data: AuthRequestBody) => {
    const user = await AuthRepository.findByEmail(data.email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await user.matchPassword(data.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return {
      id: user._id,
      email: user.email,
      token: AuthService.generateToken(user._id.toString()),
    };
  },

  getUser: async (id: string) => {
    const user = await AuthRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  },

  deleteUser: async (id: string) => {
    const deleted = await AuthRepository.deleteUser(id);
    if (!deleted) throw new Error('User not found or already deleted');
  },

  generateToken: (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });
  },
};
