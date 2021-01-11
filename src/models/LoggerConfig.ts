import { LogLevel } from '../util/config';

export interface LoggerConfig {
  isSilent: boolean;
  level: LogLevel | string;
  metaName: string;
  timeStamp: string;
}
