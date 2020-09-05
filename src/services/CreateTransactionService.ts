import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

type CreateTransactionData = {
  title: string;
  value: number;
  type: 'income' | 'outcome';
};

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: CreateTransactionData): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (transaction.type === 'outcome' && transaction.value > total)
      throw new Error();

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
