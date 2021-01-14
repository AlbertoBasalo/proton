import { rootConfig } from '../../util/config';
import { ItemsMemoryRepository } from './ItemsMemoryRepository';
import { ItemsMongoRepository } from './ItemsMongoRepository';

const repository = rootConfig.repository;

function createRepository() {
  switch (repository) {
    case 'memory':
      return new ItemsMemoryRepository();
    case 'mongodb':
      return new ItemsMongoRepository();
    default:
      return new ItemsMemoryRepository();
  }
}
export const itemsRepository = createRepository();
