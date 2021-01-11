import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import { Express } from 'express-serve-static-core';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import { RootConfig } from './models/RootConfig';
import { logger } from './util/logger';

export default function addMiddelwareTo(app: Express, rootConfig: RootConfig): void {
  app.use(bodyParser.json());
  addLoggingMiddleware(rootConfig, app);
}
function addLoggingMiddleware(rootConfig: RootConfig, app: Express) {
  if (rootConfig.isProduction) {
    app.use(
      morgan(':method :url :status :response-time ms - :res[content-length]', {
        stream: logger.getStream(),
      })
    );
  } else {
    app.use(errorhandler());
    morganBody(app, { prettify: false, stream: logger.getStream() });
  }
}
