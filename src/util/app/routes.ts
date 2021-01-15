/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { Express } from 'express-serve-static-core';
import * as jwt from 'jsonwebtoken';
import { connector, summarise } from 'swagger-routes-express';
import YAML from 'yamljs';
import * as api from '../../api';
import { httpStatus } from '../../models/httpStatus';
import { routerConfig } from '../config';
import { logger } from '../logger';

const YAMLSpecFile = routerConfig.openApi;
const validatorOptions = {
  apiSpec: YAMLSpecFile,
};

export function connectOpenAPIRoutes(app: Express): void {
  const apiDefinition = getApiDefinition();
  validateApiDefinition(app);
  connectApiToControllers(apiDefinition, app);
}

function validateApiDefinition(app: Express) {
  app.use(OpenApiValidator.middleware(validatorOptions));
}

function connectApiToControllers(apiDefinition: any, app: Express) {
  const connect = connector(api, apiDefinition, {
    security: {
      bearerAuth: auth,
    },
  });
  connect(app);
}

function getApiDefinition() {
  const apiDefinition = YAML.load(YAMLSpecFile);
  const apiSummary = summarise(apiDefinition);
  logger.dump(apiSummary);
  return apiDefinition;
}

export function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  try {
    const token = req.headers.authorization!;
    logger.info(token);
    const userToken = jwt.verify(token, 'Prot0n');
    logger.dump(userToken);
    req['userToken'] = userToken;
  } catch (err) {
    logger.warn(err);
    req['userToken'] = null;
    res.status(httpStatus.UNAUTHORIZED).json({ message: err.message });
  }
}
