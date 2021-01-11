import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  console.info('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  console.warn(
    '.env file not found see .env.example file to supply config your environment variables. Using default values instead. '
  );
}
export const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PRODUCTION = ENVIRONMENT === 'production';
const DEAFAULT_PORT = 3000;
export const PORT = process.env.PORT || DEAFAULT_PORT;
export const APP_NAME = process.env.APP_NAME || 'proton';
export const LOGGER_SILENT = process.env.LOGGER_SILENT === 'true' || false;
export const LOGGER_LEVEL = process.env.LOGGER_LEVEL || 'info';
export const LOGGER_TIMESTAMP = process.env.LOGGER_TIMESTAMP || 'YYYY-MM-DD HH:mm:ss.SSS';
