import { startServer } from './server';
import { mongoConfig, rootConfig } from './util/config';
import { connectToMongo } from './util/data/mongoClient';
import { logger } from './util/logger';

async function init() {
  try {
    logger.dump(rootConfig);
    if (mongoConfig.connect) {
      await connectToMongo();
      logger.info('Mongo dB should be connected');
    }
    const server = await startServer(rootConfig);
    logger.http(`Server started ${JSON.stringify(server.address())}`);
  } catch (error) {
    logger.fatal(error);
    process.exit(2);
  }
}
process.on('uncaughtException', (error: Error) => {
  logger.fatal(error);
  process.exit(3);
});

init();
