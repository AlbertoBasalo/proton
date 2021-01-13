import bodyParser from 'body-parser';
import { Express } from 'express-serve-static-core';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import { RootConfig } from '../../models/RootConfig';
import { routerConfig } from '../config';
import { logger } from '../logger';

export function processRequest(app: Express, rootConfig: RootConfig): void {
  addBodyMiddleware(app);
  addLoggingMiddleware(app, rootConfig);
}
function addBodyMiddleware(app: Express) {
  app.use(bodyParser.json());
}

function addLoggingMiddleware(app: Express, rootConfig: RootConfig) {
  if (rootConfig.isProduction) {
    app.use(morgan(routerConfig.morganTrace, { stream: logger.getStream() }));
  } else {
    morganBody(app, { prettify: false, stream: logger.getStream() });
  }
}
