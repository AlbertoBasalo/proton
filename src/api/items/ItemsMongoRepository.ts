import { MongoRepository } from '../../util/data/MongoRepository';
import { Item } from './Item';

export class ItemsMongoRepository extends MongoRepository<Item> {
  constructor() {
    super('items');
  }
  public async selectByCategoryId(id: string): Promise<Item[]> {
    return this.selectByQuery({ categoryId: id });
  }
}
