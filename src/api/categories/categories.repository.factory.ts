import { rootConfig } from '../../util/config';
import { CategoriesMemoryRepository } from './CategoriesMemoryRepository';

const repository = rootConfig.repository;

function createRepository() {
  switch (repository) {
    case 'memory':
      return new CategoriesMemoryRepository();
    default:
      return new CategoriesMemoryRepository();
  }
}
export const categoriesRepository = createRepository();
