import { MongoRepository } from '../../util/data/MongoRepository';

export class CategoriesMongoRepository extends MongoRepository {
  constructor() {
    super('categories');
  }
}
