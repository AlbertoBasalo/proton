import { rootConfig } from '../../util/config';
import { ProjectsMemoryRepository } from './ProjectsMemoryRepository';
const repository = rootConfig.repository;

function createRepository() {
  return new ProjectsMemoryRepository();
}
export const projectsRepository = createRepository();
