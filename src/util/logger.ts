import winston from 'winston';
import { LoggerConfig } from '../models/LoggerConfig';
import { loggerConfig } from './config';

const prettyJson = winston.format.printf(entry => {
  if (entry.message && entry.message.constructor === Object) {
    const spaces = 2;
    entry.message = JSON.stringify(entry.message, null, spaces);
  }
  return `${entry.timestamp} ${entry.label || '-'} ${entry.level}: ${entry.message}`;
});

class Logger {
  private readonly logger: winston.Logger;

  constructor(config: LoggerConfig) {
    this.logger = winston.createLogger({
      level: config.level,
      silent: config.isSilent,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp({ format: config.timeStamp }),
        prettyJson
      ),
      defaultMeta: { service: config.metaName },
      transports: [new winston.transports.Console({})],
    });
    this.info('Logger running');
  }

  public getStream() {
    return {
      write: function (message) {
        this.logger.http(message);
      }.bind(this),
    };
  }
  public debug(message: string) {
    this.logger.debug(message);
  }
  public http(message: string) {
    this.logger.http(message);
  }
  public info(message: string) {
    this.logger.info(message);
  }
  public dump(object: unknown) {
    this.logger.info(object);
  }
  public warn(message: string) {
    this.logger.warn(message);
  }
  public async error(err: Error): Promise<void> {
    try {
      await this.logger.error(err);
      // ToDo: await sendMailToAdminIfCritical();
    } catch (logError) {
      console.error(err);
      console.error(logError);
    }
  }
  public async fatal(err: Error): Promise<void> {
    await this.error(err);
    await this.logger.warn('Shutting down');
    process.exit(1);
  }
}

export const logger = new Logger(loggerConfig);
