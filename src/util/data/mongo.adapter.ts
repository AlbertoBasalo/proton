import { MongoClient } from 'mongodb';
import { mongoConfig } from '../config';
export const mongoClient = new MongoClient(mongoConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connectToMongo(): Promise<unknown> {
  try {
    console.log('connecting to: ' + mongoConfig.uri);
    return await mongoClient.connect();
  } catch (err) {
    console.log('Mongo Error');
    console.log(err);
  }
}
