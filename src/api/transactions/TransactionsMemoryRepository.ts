import { MemoryRepository } from '../../util/data/MemoryRepository';
import { Transaction } from './Transaction';

export class TransactionsMemoryRepository extends MemoryRepository<Transaction> {
  constructor() {
    const collection: Transaction[] = [
      {
        id: 'design_a_virus',
        name: 'Design a virus',
        description: 'Design a modified version of a current virus',
        kind: 'spent',
        amount: 500,
        date: new Date(2020, 0, 1),
        projectId: 'rule_the_world',
        ownerId: 'world_admin',
      },
      {
        id: 'produce_the_virus',
        name: 'produce the virus',
        description: 'Clone the virus in a secret lab',
        kind: 'spent',
        amount: 1200,
        date: new Date(2020, 1, 1),
        projectId: 'rule_the_world',
        ownerId: 'world_admin',
      },
      {
        id: 'buy_fuel',
        name: 'Buy fuel',
        description: 'A lot of fuel ',
        kind: 'spent',
        amount: 900,
        date: new Date(2024, 0, 1),
        projectId: 'conquer_mars',
        ownerId: 'world_admin',
      },
      {
        id: 'sell_view_seats',
        name: 'Sell view seats',
        description: 'Seats to view launches ',
        kind: 'income',
        amount: 80,
        date: new Date(2025, 0, 1),
        projectId: 'conquer_mars',
        ownerId: 'world_admin',
      },
    ];

    super(collection);
  }
}
