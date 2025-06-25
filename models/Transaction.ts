import mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    ammount: {
      type: Number,
      required: true,
      min: [0, 'Ammount must be positive'],
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    descripton: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model("Transaction",transactionSchema);
export default Transaction;