import dotenv from 'dotenv';
import fs from 'fs';
import { LoggerConfig } from '../models/LoggerConfig';
import { RootConfig } from '../models/RootConfig';
const DEFAULT_PORT = 3000;
export type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

initializeConfig();

function initializeConfig() {
  if (fs.existsSync('./config/.env')) {
    console.info('Using .env file to supply config environment variables');
    dotenv.config({ path: './config/.env' });
  } else {
    console.warn(
      '.env file not found see .env.example file to supply data for your environment variables. Using default values instead. '
    );
  }
}

export const loggerConfig: LoggerConfig = {
  isSilent: process.env.LOGGER_SILENT === 'true' || false,
  level: process.env.LOGGER_LEVEL || 'info',
  metaName: process.env.APP_NAME || 'proton',
  timeStamp: process.env.LOGGER_TIMESTAMP || 'YYYY-MM-DD HH:mm:ss.SSS',
};

export const routerConfig = {
  openApi: process.env.OPEN_API || './config/openapi.yml',
  morganTrace: ':method :url :status :response-time ms - :res[content-length]',
};

export const rootConfig: RootConfig = {
  environment: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  appName: process.env.APP_NAME || 'proton',
  port: normalizePort(process.env.PORT) || DEFAULT_PORT,
  serverDomain: process.env.SERVER_DOMAIN || 'http://localhost',
  loggerConfig: loggerConfig,
};

function normalizePort(checkingPort: number | string): number {
  let port: number;
  if (typeof checkingPort === 'string') {
    port = parseInt(checkingPort, 10);
  } else {
    port = checkingPort;
  }
  return port;
}
