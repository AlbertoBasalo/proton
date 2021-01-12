import express from 'express';
import { Express } from 'express-serve-static-core';
import { RootConfig } from './models/RootConfig';
import { processRequest } from './util/middelware';
import { responseErrorHandler } from './util/responseErrorHandler';
import { connectOpenAPIRoutes } from './util/routes';

export async function createApp(rootConfig: RootConfig): Promise<Express> {
  const app = express();
  processRequest(app, rootConfig);
  connectOpenAPIRoutes(app);
  responseErrorHandler(app, rootConfig);
  return app;
}
