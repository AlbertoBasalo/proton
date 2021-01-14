import { MongoRepository } from '../../util/data/MongoRepository';
import { Item } from './Item';

export class ItemsMongoRepository extends MongoRepository<Item> {
  constructor() {
    super('items');
  }
  public selectByCategoryId(id: string): Promise<Item[]> {
    return super.getCollection().find({ categoryId: id }).toArray();
  }
}
