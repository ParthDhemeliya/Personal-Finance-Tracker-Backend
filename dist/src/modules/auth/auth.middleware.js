import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import dotenv from 'dotenv';
import { AppError } from '../../utils/error/AppError';
dotenv.config();
const protect = async (req, _res, next) => {
    try {
        let token;
        // 1. Try to get token from Authorization header
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        // 2. Fallback: Try to get token from cookies
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }
        // 3. If still no token, return error
        if (!token) {
            return next(new AppError('Not authorized, token missing', 401));
        }
        // 4. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 5. Attach user to request if valid
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return next(new AppError('User not found', 401));
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.error('Auth middleware error:', err);
        return next(new AppError('Invalid or expired token', 401));
    }
};
export default protect;
