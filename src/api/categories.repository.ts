import { MemoryRepository } from '../util/MemoryRepository';
import { MongoRepository } from '../util/MongoDBRepository';

class CategoriesRepository extends MemoryRepository {
  constructor() {
    const collection = [
      { id: '1', name: 'Libraries', description: 'Packages or source code' },
      { id: '2', name: 'UI components', description: 'Presentational frameworks and utilities' },
    ];

    super(collection);
  }

  public async selectAsync(): Promise<unknown[]> {
    return await new MongoRepository('categories').select();
  }
}

export const categoriesRepository = new CategoriesRepository();
