import { MongoRepository } from '../util/MongoDBRepository';

export class CategoriesMongoRepository extends MongoRepository {
  constructor() {
    super('categories');
  }
}
