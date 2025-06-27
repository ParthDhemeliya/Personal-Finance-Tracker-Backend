import { IncomeRepository } from './income.repository';
import { IncomeInput } from './income.interface';

export const IncomeService = {
    
  createIncome: (data: IncomeInput) =>
    IncomeRepository.create({
      ...data,
      type: 'income',
    }),

  getIncomes: (userId: string) => IncomeRepository.findAllByUser(userId),

  updateIncome: (id: string, userId: string, updates: Partial<IncomeInput>) =>
    IncomeRepository.updateById(id, userId, updates),

  deleteIncome: (id: string, userId: string) =>
    IncomeRepository.deleteById(id, userId),
};
