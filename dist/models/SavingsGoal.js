import mongoose, { Schema } from 'mongoose';
const SavingsGoalSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    targetDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
SavingsGoalSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
SavingsGoalSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});
const SavingsGoal = mongoose.model('SavingsGoal', SavingsGoalSchema);
export default SavingsGoal;
