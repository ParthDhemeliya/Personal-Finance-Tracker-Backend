import mongoose from "mongoose";
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }
    next();
};
export default validateObjectId;
