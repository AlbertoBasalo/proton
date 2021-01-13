import http from 'http';
import { RootConfig } from './models/RootConfig';
import { createApp } from './util/app/app';

export async function startServer(rootConfig: RootConfig): Promise<http.Server> {
  const app = await createApp(rootConfig);
  const server = http.createServer(app);
  server.listen(rootConfig.port);
  return server;
}
