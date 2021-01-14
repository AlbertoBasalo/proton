import { ItemsMemoryRepository } from './ItemsMemoryRepository';
import { ItemsMongoRepository } from './ItemsMongoRepository';

const isMemory = false;
export const itemsRepository = isMemory ? new ItemsMemoryRepository() : new ItemsMongoRepository();
