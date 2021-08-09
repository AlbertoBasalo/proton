import { MongoClient } from 'mongodb';
import { mongoConfig } from '../config';
export let mongoClient: MongoClient;

export async function connectToMongo(): Promise<unknown> {
  try {
    mongoClient = new MongoClient(mongoConfig.uri);
    return await mongoClient.connect();
  } catch (err) {
    console.log(err);
  }
}
