import Category from '../../../models/Category';
export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    catch (err) {
        next(err);
    }
};
