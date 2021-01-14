import express from 'express';
import { Express } from 'express-serve-static-core';
import { httpStatus } from '../../models/httpStatus';
import { ResponseError } from '../../models/ResponseError';
import { RootConfig } from '../../models/RootConfig';
import { logger } from '../logger';

export function responseErrorHandler(app: Express, rootConfig: RootConfig): void {
  app.use(
    (
      err: ResponseError,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (res.headersSent) {
        return next(err);
      }
      handleError(err, req, res, rootConfig);
    }
  );
}

function handleError(
  err: ResponseError,
  req: express.Request,
  res: express.Response,
  rootConfig: RootConfig
) {
  logger.error(err);
  const responseError: ResponseError = {
    name: err.name,
    message: err.message,
  };
  if (err.errors) responseError.errors = err.errors;
  if (!rootConfig.isProduction) {
    logger.warn(`${req.url} throws ${err.stack || 'No stack'}`);
  }
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json(responseError);
}
