import { rootConfig } from '../../util/config';
import { TransactionsMemoryRepository } from './TransactionsMemoryRepository';
const repository = rootConfig.repository;

function createRepository() {
  return new TransactionsMemoryRepository();
}
export const transactionsRepository = createRepository();
