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
        amount: 100,
        date: new Date(2020, 0, 1),
        projectId: 'rule_the_world',
        ownerId: 'world_admin',
      },
      {
        id: 'produce_the_virus',
        name: 'produce the virus',
        description: 'Clone the virus in a secret lab',
        kind: 'spent',
        amount: 120,
        date: new Date(2020, 1, 1),
        projectId: 'rule_the_world',
        ownerId: 'world_admin',
      },
      {
        id: 'sell_the_vaccine',
        name: 'Sell the vaccine',
        description: 'Sell a vaccine with 5G integrated',
        kind: 'income',
        amount: 250,
        date: new Date(2021, 1, 1),
        projectId: 'rule_the_world',
        ownerId: 'world_admin',
      },
      {
        id: 'buy_fuel',
        name: 'Buy fuel',
        description: 'A lot of fuel',
        kind: 'spent',
        amount: 9,
        date: new Date(2022, 0, 1),
        projectId: 'conquer_mars',
        ownerId: 'world_admin',
      },
      {
        id: 'build_a_factory',
        name: 'Build a factory',
        description: 'A factory to construct a rocket',
        kind: 'spent',
        amount: 65,
        date: new Date(2022, 0, 1),
        projectId: 'conquer_mars',
        ownerId: 'world_admin',
      },
      {
        id: 'sell_view_seats',
        name: 'Sell view seats',
        description: 'Seats to view launches',
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
