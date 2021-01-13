import express from 'express';
import { Express } from 'express-serve-static-core';
import { httpStatus } from '../../models/httpStatus';
import { ResponseError } from '../../models/ResponseError';
import { RootConfig } from '../../models/RootConfig';
import { logger } from '../logger';

export function responseHandler(app: Express, rootConfig: RootConfig): void {
  app.use(
    (
      err: ResponseError,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (err) {
        handleError(err, req, res, rootConfig);
      } else {
        handleSuccess(req, res, next, rootConfig);
      }
    }
  );
}

function handleError(
  err: ResponseError,
  req: express.Request,
  res: express.Response,
  rootConfig: RootConfig
) {
  logger.warn(req.url);
  logger.error(err);
  const responseError: ResponseError = {
    status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
    name: err.name,
    message: err.message,
  };

  if (rootConfig.isProduction) {
    responseError.stack = '';
  } else {
    responseError.errors = err.errors || '';
  }
  res.status(err.status).json({ error: responseError });
}

function handleSuccess(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  rootConfig: RootConfig
) {
  // ToDo: infer response code from method verb
  next;
}
