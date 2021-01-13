import express from 'express';
import { Express } from 'express-serve-static-core';
import { RootConfig } from '../../models/RootConfig';
import { processRequest } from './requests';
import { responseHandler } from './responses';
import { connectOpenAPIRoutes } from './routes';

export async function createApp(rootConfig: RootConfig): Promise<Express> {
  const app = express();
  processRequest(app, rootConfig);
  connectOpenAPIRoutes(app);
  responseHandler(app, rootConfig);
  return app;
}
