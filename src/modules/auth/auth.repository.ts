import User from '../../../models/User';
import { SignupRequestBody } from './auth.interface';

export const AuthRepository = {
  findByEmail: async (email: string) => User.findOne({ email }),
  createUser: async (data: SignupRequestBody) => User.create(data),
  findById: async (id: string) => User.findById(id).select('-password'),
  deleteUser: async (id: string) => User.findByIdAndDelete(id),
};
