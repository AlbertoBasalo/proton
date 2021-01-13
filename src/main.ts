import { startServer } from './server';
import { rootConfig } from './util/config';
import { logger } from './util/logger';
import { connectToMongo } from './util/MongoDBRepository';

let mongo;
async function init() {
  try {
    logger.dump(rootConfig);
    mongo = await connectToMongo();
    logger.info('Mongo dB should be connected');
    const server = await startServer(rootConfig);
    logger.http(`Server started ${JSON.stringify(server.address())}`);
  } catch (error) {
    logger.fatal(error);
    mongo.close();
  }
}
process.on('uncaughtException', (error: Error) => {
  logger.fatal(error);
  mongo.close();
});
init();
