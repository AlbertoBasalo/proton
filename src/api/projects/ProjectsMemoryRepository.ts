import { MemoryRepository } from '../../util/data/MemoryRepository';
import { Project } from './Project';

export class ProjectsMemoryRepository extends MemoryRepository<Project> {
  constructor() {
    const collection: Project[] = [
      {
        id: '1',
        name: 'Rule the world',
        description: 'Take over the world',
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2024, 11, 31),
        budget: 5000,
        status: 'active',
      },
      {
        id: '2',
        name: 'Conquer Mars',
        description: 'Establish a civilization on Mars',
        startDate: new Date(2022, 0, 1),
        budget: 99000,
        status: 'plan',
      },
      ,
    ];

    super(collection);
  }
}
