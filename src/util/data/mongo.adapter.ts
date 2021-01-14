import { MongoClient } from 'mongodb';
import { mongoConfig } from '../config';
export const mongoClient = new MongoClient(mongoConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connectToMongo(): Promise<unknown> {
  return await mongoClient.connect();
}
