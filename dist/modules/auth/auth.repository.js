import User from '../../../models/User';
export const AuthRepository = {
    findByEmail: async (email) => User.findOne({ email }),
    createUser: async (data) => User.create(data),
    findById: async (id) => User.findById(id).select('-password'),
    deleteUser: async (id) => User.findByIdAndDelete(id),
};
