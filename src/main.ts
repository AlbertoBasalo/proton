import { startServer } from './server';
import { rootConfig } from './util/config';
import { logger } from './util/logger';

async function init() {
  try {
    logger.dump(rootConfig);
    const server = await startServer(rootConfig);
    logger.http(`Server started ${JSON.stringify(server.address())}`);
  } catch (error) {
    logger.fatal(error);
  }
}
process.on('uncaughtException', (error: Error) => {
  logger.fatal(error);
});
init();
