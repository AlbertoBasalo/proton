import logger from './logger';

class ErrorHandler {
  public async handleFatalError(err: Error): Promise<void> {
    await this.handleError(err);
    process.exit(1);
  }
  public async handleError(err: Error): Promise<void> {
    try {
      await logger.error(err);
      // ToDo: await sendMailToAdminIfCritical();
    } catch (logError) {
      console.error(err);
      console.error(logError);
    }
  }
}

export const errorHandler = new ErrorHandler();
