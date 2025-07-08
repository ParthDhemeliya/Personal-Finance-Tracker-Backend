import mongoose, { Schema } from 'mongoose';
const BudgetSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    period: { type: String, enum: ['month', 'year'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
BudgetSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
BudgetSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});
const Budget = mongoose.model('Budget', BudgetSchema);
export default Budget;
