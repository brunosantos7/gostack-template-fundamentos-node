/* eslint-disable class-methods-use-this */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

type CreateTransactionData = {
  title: string;
  value: number;
  type: 'income' | 'outcome';
};

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total } as Balance;
  }

  public create(transaction: CreateTransactionData): Transaction {
    const newTransaction = new Transaction({ ...transaction });
    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
