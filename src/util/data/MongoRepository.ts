import { Collection, FilterQuery, OptionalId } from 'mongodb';
import { Repository } from '../../models/Repository';
import { mongoConfig } from '../config';
import { mongoClient } from './mongo.adapter';

export class MongoRepository<T> implements Repository<T> {
  constructor(protected readonly collectionName: string) {}

  protected getCollection(): Collection<T> {
    return mongoClient.db(mongoConfig.db).collection<T>(this.collectionName);
  }

  public select(): Promise<T[]> {
    return this.selectByQuery({});
  }

  public selectByQuery(query: FilterQuery<T>): Promise<T[]> {
    return this.getCollection()
      .find(query, { projection: { _id: 0 } })
      .toArray();
  }

  public async selectById(id: string): Promise<T | null> {
    return await this.getCollection().findOne<T>(this.getKeyQuery(id), { projection: { _id: 0 } });
  }

  public async insert(toAdd: T): Promise<T> {
    const conflict = await this.selectById(toAdd['id']);
    if (conflict) {
      return null;
    }
    const result = await this.getCollection().insertOne(toAdd as OptionalId<T>);
    return { _id: result.insertedId, ...toAdd };
  }
  public async update(id: string, toUpdate: Partial<T>): Promise<T> {
    const result = await this.getCollection().findOneAndReplace(this.getKeyQuery(id), toUpdate);
    if (result['value']) {
      return { ...result['value'] };
    } else {
      return null;
    }
  }
  public async delete(id: string): Promise<boolean> {
    const result = await this.getCollection().findOneAndDelete(this.getKeyQuery(id));
    if (result['value']) {
      return true;
    } else {
      return false;
    }
  }
  private getKeyQuery(id: string): FilterQuery<T | { _id: unknown }> {
    return { id: id };
  }
}
