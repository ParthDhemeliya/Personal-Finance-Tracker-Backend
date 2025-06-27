import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import run from './config/db';
import authRoutes from './routes/authRoutes';
import chalk from 'chalk';
import incomeRoutes from './src/modules/income/income.routes';
import './models/Category';
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

// Connect to MongoDB
run();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/v1/incomes', incomeRoutes);

// Startup banner
app.listen(port, () => {
  console.log(
    chalk.cyanBright(`🚀 Server is running on http://localhost:${port}`),
  );
  console.log(chalk.magenta(`📦 API Base: /api`));
});
