import { MongoRepository } from '../../util/data/MongoRepository';
import { Category } from './Category';

export class CategoriesMongoRepository extends MongoRepository<Category> {
  constructor() {
    super('categories');
  }
}
