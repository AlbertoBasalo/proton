import * as cors from 'cors';
import express from 'express';
import { Express } from 'express-serve-static-core';
import { RootConfig } from '../../models/RootConfig';
import { processRequest } from './requests';
import { responseErrorHandler } from './responseErrorHandler';
import { connectOpenAPIRoutes } from './routes';

export async function createApp(rootConfig: RootConfig): Promise<Express> {
  const app = express();
  app.use(cors.default());
  processRequest(app, rootConfig);
  connectOpenAPIRoutes(app);
  responseErrorHandler(app, rootConfig);
  return app;
}
