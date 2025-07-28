import Category from '../../../models/Category.js';
export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    catch (err) {
        next(err);
    }
};
