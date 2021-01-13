import { MongoClient } from 'mongodb';
import { mongoConfig } from './config';

const client = new MongoClient(mongoConfig.uri, { useNewUrlParser: true });

export const testmongo = async (): Promise<unknown> => {
  await client.connect(async err => {
    // const collection = client.db(mongoConfig.db).collection('categories');
    // // perform actions on the collection object
    // const result = await collection.find().toArray();
    // console.log({ result });
    // client.close();
  });
  return client;
};

export class MongoRepository {
  private collection;
  constructor(protected readonly collectionName: string) {
    this.collection = client.db(mongoConfig.db).collection(collectionName);
  }

  public select(): unknown[] {
    return this.collection.find().toArray();
  }
}
