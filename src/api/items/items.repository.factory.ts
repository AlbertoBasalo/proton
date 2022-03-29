import { rootConfig } from '../../util/config';
import { ItemsMemoryRepository } from './ItemsMemoryRepository';

const repository = rootConfig.repository;

function createRepository() {
  switch (repository) {
    case 'memory':
      return new ItemsMemoryRepository();
    default:
      return new ItemsMemoryRepository();
  }
}
export const itemsRepository = createRepository();
