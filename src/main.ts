import { startServer } from './server';
import { rootConfig } from './util/config';
import { connectToMongo } from './util/data/mongo.adapter';
import { logger } from './util/logger';

enum processExitCodes {
  ok = 1,
  hadledError = 2,
  uncaughtException = 3,
}

async function init() {
  logger.info('Init');
  try {
    logger.dump(rootConfig);
    if (rootConfig.repository === 'mongodb') {
      logger.info('Using Mongo dB repositor');
      await connectToMongo();
    } else {
      logger.info('Using in memory repository');
    }
    const server = await startServer(rootConfig);
    logger.http(`Server started ${JSON.stringify(server.address())}`);
  } catch (error) {
    logger.fatal(error);
    process.exit(processExitCodes.hadledError);
  }
}
process.on('uncaughtException', (error: Error) => {
  logger.fatal(error);
  process.exit(processExitCodes.uncaughtException);
});

init();
