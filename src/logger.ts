import winston from 'winston';
import { APP_NAME, LOGGER_LEVEL, LOGGER_SILENT, LOGGER_TIMESTAMP } from './config';

// type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

const prettyJson = winston.format.printf(info => {
  if (info.message.constructor === Object) {
    const spaces = 2;
    info.message = JSON.stringify(info.message, null, spaces);
  }
  return `${info.timestamp} ${info.label || '-'} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  level: LOGGER_LEVEL,
  silent: LOGGER_SILENT,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp({ format: LOGGER_TIMESTAMP }),
    prettyJson
  ),
  defaultMeta: { service: APP_NAME },
  transports: [new winston.transports.Console({})],
});

export default logger;
