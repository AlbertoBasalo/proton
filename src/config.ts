import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  console.info('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  console.warn('Using .env.example file to supply config environment variables');
  dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PRODUCTION = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
export const PORT = process.env.PORT;
