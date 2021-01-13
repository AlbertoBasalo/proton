import { MemoryRepository } from '../util/MemoryRepository';

class CategoriesRepository extends MemoryRepository {
  constructor() {
    const collection = [
      { id: '1', name: 'Libraries', description: 'Packages or source code' },
      { id: '2', name: 'UI components', description: 'Presentational frameworks and utilities' },
    ];

    super(collection);
  }
}

export const categoriesRepository = new CategoriesRepository();
