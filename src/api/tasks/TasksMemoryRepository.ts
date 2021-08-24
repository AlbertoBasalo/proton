import { MemoryRepository } from '../../util/data/MemoryRepository';
import { Task } from './Task';

export class TaksMemoryRepository extends MemoryRepository<Task> {
  constructor() {
    const collection: Task[] = [
      {
        id: 'create_a_virus',
        name: 'Create a virus',
        description: 'A modified version of a current virus',
        done: true,
        projectId: 'rule_the_world',
        ownerId: 'world_admin',
      },
      {
        id: 'deploy_the_virus',
        name: 'Deploy the virus',
        description: 'Release the virus to the environment on a cute pet',
        done: true,
        projectId: 'rule_the_world',
        ownerId: 'world_admin',
      },
      {
        id: 'have_a_rocket',
        name: 'Have a rocket',
        description: 'A very big rocket ',
        done: false,
        projectId: 'conquer_mars',
        ownerId: 'world_admin',
      },
    ];

    super(collection);
  }
}
