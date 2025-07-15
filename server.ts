/* eslint-env node */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import run from './config/db';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

import incomeRoutes from './src/modules/income/income.routes';
import authRoutes from './src/modules/auth/auth.routes';
import './models/Category';
import { globalErrorHandler } from './src/middlewares/error.middleware';
import expenseRoutes from './src/modules/expense/expense.routes';
import transactionRoutes from './src/modules/transaction/transaction.routes';
import balanceRoutes from './src/modules/balance/balance.routes';
import budgetRoutes from './src/modules/budget/budget.routes';
import categoryRoutes from './src/modules/category/category.routes';
import savingsRoutes from './src/modules/savings/savings.routes';
import rootRoute from './src/routes/root.route';

dotenv.config();
const port = Number(process.env.PORT) || 5000;
const app = express();

// ✅ Updated CORS setup with dynamic origin check
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://personal-finance-tracker-frontend-8pxf3itg9.vercel.app',
  'https://personal-finance-tracker-inky-three.vercel.app',
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    console.log('Incoming request origin:', origin); // 👈 debug
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// ✅ Routes
app.use('/', rootRoute);
app.use('/api/auth', authRoutes);
app.use('/api/v1/incomes', incomeRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/balance', balanceRoutes);
app.use('/api/v1/budgets', budgetRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/savings-goal', savingsRoutes);

// Global error handler
app.use(globalErrorHandler);

//  Wait for DB before starting server
run()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(
        chalk.cyanBright(`🚀 Server is running on http://localhost:${port}`),
      );
      console.log(chalk.magenta(`📦 API Base: /api`));
    });
  })
  .catch((err) => {
    console.error(chalk.red(`❌ Failed to connect to MongoDB`));
    console.error(err);
    process.exit(1);
  });
