import { rootConfig } from '../../util/config';
import { TaksMemoryRepository } from './TasksMemoryRepository';
const repository = rootConfig.repository;

function createRepository() {
  return new TaksMemoryRepository();
}
export const tasksRepository = createRepository();
