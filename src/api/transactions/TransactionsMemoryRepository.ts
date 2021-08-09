import { MemoryRepository } from '../../util/data/MemoryRepository';
import { Transaction } from './Transaction';

export class TransactionsMemoryRepository extends MemoryRepository<Transaction> {
  constructor() {
    const collection: Transaction[] = [
      {
        id: '1',
        name: 'Create a virus',
        description: 'Design and produce a modified version of a current virus',
        kind: 'spent',
        amount: 500,
        date: new Date(2020, 0, 1),
        projectId: '1',
      },
      {
        id: '2',
        name: 'Deploy the virus',
        description: 'Release the virus to the evironment on a cute pet',
        kind: 'spent',
        amount: 500,
        date: new Date(2020, 0, 1),
        projectId: '1',
      },
      {
        id: '3',
        name: 'Buy fuel',
        description: 'A lot of fuel ',
        kind: 'spent',
        amount: 900,
        date: new Date(2024, 0, 1),
        projectId: '2',
      },
      {
        id: '3',
        name: 'Sell view seats',
        description: 'Seats to view launches ',
        kind: 'income',
        amount: 80,
        date: new Date(2025, 0, 1),
        projectId: '2',
      },
    ];

    super(collection);
  }
}
