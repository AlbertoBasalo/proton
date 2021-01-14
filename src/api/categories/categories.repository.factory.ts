import { CategoriesMemoryRepository } from './CategoriesMemoryRepository';
import { CategoriesMongoRepository } from './CategoriesMongoRepository';
const isMemory = false;
export const categoriesRepository = isMemory
  ? new CategoriesMemoryRepository()
  : new CategoriesMongoRepository();
