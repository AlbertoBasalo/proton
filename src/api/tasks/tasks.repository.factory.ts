import { rootConfig } from '../../util/config';
import { TasksMemoryRepository } from './TasksMemoryRepository';
const repository = rootConfig.repository;

function createRepository() {
  return new TasksMemoryRepository();
}
export const tasksRepository = createRepository();
