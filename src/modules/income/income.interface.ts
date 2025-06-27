import { Types } from "mongoose";

export interface IncomeInput {
  amount: number;
  date: string;
  description?: string;
  paymentMethod: "cash" | "card" | "bank_transfer" | "other";
  currency: string;
  incomeSource: Types.ObjectId;
  user: Types.ObjectId;
  type?: string; 
}