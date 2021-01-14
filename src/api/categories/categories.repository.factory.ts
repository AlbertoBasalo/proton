import { rootConfig } from '../../util/config';
import { CategoriesMemoryRepository } from './CategoriesMemoryRepository';
import { CategoriesMongoRepository } from './CategoriesMongoRepository';
const repository = rootConfig.repository;

function createRepository() {
  switch (repository) {
    case 'memory':
      return new CategoriesMemoryRepository();
    case 'mongodb':
      return new CategoriesMongoRepository();
    default:
      return new CategoriesMemoryRepository();
  }
}
export const categoriesRepository = createRepository();
