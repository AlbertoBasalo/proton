import { startServer } from './server';
import { rootConfig } from './util/config';
import { logger } from './util/logger';

enum processExitCodes {
  ok = 1,
  handledError = 2,
  uncaughtException = 3,
}

async function init() {
  logger.info('Init');
  try {
    logger.dump(rootConfig);
    logger.info('Using in memory repository');
    const server = await startServer(rootConfig);
    logger.http(`Server started ${JSON.stringify(server.address())}`);
  } catch (error) {
    logger.fatal(error);
    process.exit(processExitCodes.handledError);
  }
}
process.on('uncaughtException', (error: Error) => {
  logger.fatal(error);
  process.exit(processExitCodes.uncaughtException);
});

init();
