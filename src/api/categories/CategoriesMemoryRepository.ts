import { MemoryRepository } from '../../util/data/MemoryRepository';

export class CategoriesMemoryRepository extends MemoryRepository {
  constructor() {
    const collection = [
      { id: '1', name: 'Libraries', description: 'Packages or source code' },
      { id: '2', name: 'UI components', description: 'Presentational frameworks and utilities' },
    ];

    super(collection);
  }
}
