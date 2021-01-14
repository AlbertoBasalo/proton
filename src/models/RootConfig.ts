import { LoggerConfig } from './LoggerConfig';

export interface RootConfig {
  environment: string;
  isProduction: boolean;
  appName: string;
  port: number;
  serverDomain: string;
  repository: string;
  loggerConfig: LoggerConfig;
}
