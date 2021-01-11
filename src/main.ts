import { PORT } from './config';
import logger from './logger';
import { startServer } from './server';
async function init() {
  try {
    const server = await startServer(PORT);
    logger.http(`Server started ${JSON.stringify(server.address())}`);
  } catch (error) {
    logger.error(`Error: ${error}`);
    process.exit(1);
  }
}
init();
