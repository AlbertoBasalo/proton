import http from 'http';
import { createApp } from './app';
import { RootConfig } from './models/RootConfig';
import { logger } from './util/logger';

export async function startServer(rootConfig: RootConfig): Promise<http.Server> {
  const app = await createApp(rootConfig);
  const server = http.createServer(app);
  server.listen(rootConfig.port);
  logger.info(`Listening on port: ${rootConfig.serverDomain}:${rootConfig.port}`);
  return server;
}
