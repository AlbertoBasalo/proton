import { MemoryRepository } from '../../util/data/MemoryRepository';
import { Task } from './Task';

export class TasksMemoryRepository extends MemoryRepository<Task> {
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
        id: 'start_a-war',
        name: 'Start a war',
        description: 'Start a war against the world',
        done: false,
        projectId: 'rule_the_world',
        ownerId: 'world_admin',
      },
      {
        id: 'have_a_rocket',
        name: 'Have a rocket',
        description: 'A very big and powerful rocket',
        done: true,
        projectId: 'conquer_mars',
        ownerId: 'world_admin',
      },
      {
        id: 'have_a_spaceship',
        name: 'Have a spaceship',
        description: 'A modern spaceship',
        done: false,
        projectId: 'conquer_mars',
        ownerId: 'world_admin',
      },
    ];

    super(collection);
  }
}
