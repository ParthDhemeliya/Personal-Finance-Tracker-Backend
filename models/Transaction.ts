import mongoose, { Schema, Document, Model } from 'mongoose';

const TRANSACTION_TYPES = ['income', 'expense'] as const;
const PAYMENT_METHODS = ['cash', 'card', 'bank_transfer', 'other'] as const;

interface ITransaction extends Document {
  type: (typeof TRANSACTION_TYPES)[number];
  amount: mongoose.Types.Decimal128;
  incomeSource?: mongoose.Types.ObjectId;
  expenseCategory?: mongoose.Types.ObjectId;
  date: Date;
  description?: string;
  user: mongoose.Types.ObjectId;
  paymentMethod: (typeof PAYMENT_METHODS)[number];
  currency: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    type: {
      type: String,
      enum: TRANSACTION_TYPES,
      required: true,
    },
    amount: {
      type: Schema.Types.Decimal128,
      required: true,
      min: [0, 'Amount must be positive'],
    },

    incomeSource: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: function requiredIncomeSource(this: ITransaction) { // Fix for linting error
        return this.type === 'income';
      },
    },

    expenseCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: function requiredExpenseCategory(this: ITransaction) { // Fix for linting error
        return this.type === 'expense';
      },
    },

    date: {
      type: Date,
      required: true,
      default: () => new Date(),
      validate: {
        validator: (value: Date) => value <= new Date(),
        message: 'Date cannot be in the future',
      },
    },

    description: {
      type: String,
      default: '',
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS,
      default: 'cash',
    },

    currency: {
      type: String,
      default: 'USD',
      minlength: 3,
      maxlength: 3,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
transactionSchema.index({ user: 1, date: -1 });
transactionSchema.index({ user: 1, type: 1, date: -1 });

// Add custom validator to enforce exclusivity
transactionSchema.pre('validate', function(this: ITransaction, next) {
  if (
    (this.type === 'income' && !this.incomeSource) ||
    (this.type === 'expense' && !this.expenseCategory)
  ) {
    next(new Error('Category reference must be present based on transaction type'));
  } else {
    next();
  }
});

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>(
  'Transaction',
  transactionSchema,
);

export default Transaction;
