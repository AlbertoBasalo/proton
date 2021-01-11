import http from 'http';
import { createApp } from './app';

export async function startServer(environmentPort: number | string): Promise<http.Server> {
  const app = await createApp();
  const server = http.createServer(app);
  const serverDomain = process.env.SERVER_DOMAIN || 'http://localhost';
  const port = normalizePort(environmentPort);
  server.listen(port);
  console.info(`Listening on port: ${serverDomain}:${port}`);
  return server;
}

export function normalizePort(checkingPort: number | string): number | string | boolean {
  let port: number;
  if (typeof checkingPort === 'string') {
    port = parseInt(checkingPort, 10);
  } else {
    port = checkingPort;
  }

  if (isNaN(port)) return checkingPort;
  if (port >= 0) return port;
  return false;
}
