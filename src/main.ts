import { PORT } from './config';
import { errorHandler } from './error-handler';
import logger from './logger';
import { startServer } from './server';

async function init() {
  try {
    const server = await startServer(PORT);
    logger.http(`Server started ${JSON.stringify(server.address())}`);
  } catch (error) {
    errorHandler.handleError(error);
  }
}
process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error);
});
init();

// ToDo:
// revisar y comitear error logger
// valorar uso de import errorHandler from "errorhandler";
// mejorar quark configuración y log
