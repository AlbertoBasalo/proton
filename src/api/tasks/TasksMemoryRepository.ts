import { MemoryRepository } from '../../util/data/MemoryRepository';
import { Task } from './Task';

export class TaksMemoryRepository extends MemoryRepository<Task> {
  constructor() {
    const collection: Task[] = [
      {
        id: '1',
        name: 'Create a virus',
        description: 'A modified version of a current virus',
        done: true,
        projectId: '1',
      },
      {
        id: '2',
        name: 'Deploy the virus',
        description: 'Release the evironment on a cute pet',
        done: true,
        projectId: '1',
      },
      {
        id: '3',
        name: 'Have a rocket',
        description: 'A very big rocket ',
        done: false,
        projectId: '2',
      },
    ];

    super(collection);
  }
}
