import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { LoggerConfig } from '../models/LoggerConfig';
import { RootConfig } from '../models/RootConfig';
const ASSETS = './config/';
const DEFAULT_PORT = 3000;
export type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

initializeConfig();

function initializeConfig() {
  console.log(process.cwd());
  if (process.env.SYSTEM === 'heroku') {
    console.log('Running on Heroku!');
    return;
  }
  console.log(path.resolve(`${ASSETS}.env`));
  if (fs.existsSync(`${ASSETS}.env`)) {
    console.info('Using .env file to supply config environment variables');
    dotenv.config({ path: `${ASSETS}.env` });
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
  openApi: process.env.OPEN_API || `${ASSETS}openapi.yml`,
  morganTrace: ':method :url :status :response-time ms - :res[content-length]',
};

export const emailConfig = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  host: process.env.EMAIL_HOST || 'smtp.googlemail.com',
  port: process.env.EMAIL_PORT || 465,
  secure: process.env.EMAIL_SECURE || true,
  user: process.env.EMAIL_USER || 'your.email@gmail.com',
  password: process.env.EMAIL_PASSWORD || 'YourPassword',
  senderName: process.env.EMAIL_SENDER_NAME || 'Sender name',
  senderEmail: process.env.EMAIL_SENDER_EMAIL || 'sender@gmail.com',
};

export const mongoConfig = {
  connect: process.env.MONGO_CONNECT || false,
  uri: process.env.MONGO_URI || '',
  db: process.env.MONGO_DB || 'proton',
};

export const rootConfig: RootConfig = {
  environment: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  appName: process.env.APP_NAME || 'proton',
  port: normalizePort(process.env.PORT) || DEFAULT_PORT,
  serverDomain: process.env.SERVER_DOMAIN || 'http://localhost',
  repository: process.env.REPOSITORY || 'memory',
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
