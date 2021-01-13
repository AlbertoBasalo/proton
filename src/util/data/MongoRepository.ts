/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Collection } from 'mongodb';
import { Repository } from '../../models/Repository';
import { mongoConfig } from '../config';
import { mongoClient } from './mongoClient';

export class MongoRepository implements Repository {
  constructor(protected readonly collectionName: string) {}

  protected getCollection(): Collection<any> {
    return mongoClient.db(mongoConfig.db).collection(this.collectionName);
  }

  public select(): Promise<unknown[]> {
    return this.getCollection().find().toArray();
  }

  public async selectById(id: string): Promise<unknown> {
    return await this.getCollection().findOne<object>({ id: id });
  }

  public async insert(toAdd: object): Promise<unknown> {
    const conflict = await this.selectById(toAdd['id']);
    if (conflict) {
      return null;
    }
    const result = await this.getCollection().insertOne(toAdd);
    return { _id: result.insertedId, ...toAdd };
  }
  public async update(id: string, toUpdate: object): Promise<object> {
    const result = await this.getCollection().findOneAndReplace({ id: id }, toUpdate);
    if (result['value']) {
      return { ...result['value'] };
    } else {
      return null;
    }
  }
  public async delete(id: string): Promise<unknown> {
    const result = await this.getCollection().findOneAndDelete({ id: id });
    if (result['value']) {
      return true;
    } else {
      return false;
    }
  }
}
