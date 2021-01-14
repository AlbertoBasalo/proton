import { MemoryRepository } from '../../util/data/MemoryRepository';
import { Category } from './Category';

export class CategoriesMemoryRepository extends MemoryRepository<Category> {
  constructor() {
    const collection: Category[] = [
      { id: '1', name: 'Libraries', description: 'Packages or source code' },
      { id: '2', name: 'UI components', description: 'Presentational frameworks and utilities' },
    ];

    super(collection);
  }
}
