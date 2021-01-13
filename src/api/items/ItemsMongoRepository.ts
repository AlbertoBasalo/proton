import { MongoRepository } from '../../util/data/MongoRepository';

export class ItemsMongoRepository extends MongoRepository {
  constructor() {
    super('items');
  }
  public selectByCategoryId(id: string): unknown {
    return super.getCollection().find({ categoryId: id }).toArray();
  }
}
