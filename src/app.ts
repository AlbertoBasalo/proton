import express from 'express';
import { Express } from 'express-serve-static-core';
import addMiddelwareTo from './middelware';
import { RootConfig } from './models/RootConfig';
import { connectOpenAPIRoutes } from './routes';
export async function createApp(rootConfig: RootConfig): Promise<Express> {
  const app = express();
  addMiddelwareTo(app, rootConfig);
  connectOpenAPIRoutes(app);
  return app;
}
