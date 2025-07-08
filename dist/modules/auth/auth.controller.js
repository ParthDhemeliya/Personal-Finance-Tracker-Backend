import { AuthService } from './auth.service';
export const signup = async (req, res, next) => {
    try {
        const result = await AuthService.signup(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
};
export const login = async (req, res, next) => {
    try {
        const result = await AuthService.login(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
export const getUser = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user._id.toString();
        const user = await AuthService.getUser(userId);
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
};
export const deleteUser = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user._id.toString();
        await AuthService.deleteUser(userId);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
