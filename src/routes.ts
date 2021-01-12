/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { Express } from 'express-serve-static-core';
import { connector, summarise } from 'swagger-routes-express';
import YAML from 'yamljs';
import * as api from './api';
import { logger } from './util/logger';

const YAMLSpecFile = './src/openapi.yml';
const validatorOptions = {
  coerceTypes: true,
  apiSpec: YAMLSpecFile,
  validateRequests: true,
  validateResponses: true,
};

export function connectOpenAPIRoutes(app: Express): void {
  const apiDefinition = getApiDefinition();

  validateApiDefinition(app);

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err) {
      logger.warn(req.url);
      logger.error(err);
      res.status(err.status).json(err);
    } else {
      next;
    }
  });

  connectApiToControllers(apiDefinition, app);
}
function validateApiDefinition(app: Express) {
  app.use(OpenApiValidator.middleware(validatorOptions));
}

function connectApiToControllers(apiDefinition: any, app: Express) {
  const connect = connector(api, apiDefinition, {
    onCreateRoute: (method: string, descriptor: [string, { name: string }]) => {
      logger.http(`${method}: ${descriptor[0]} : ${descriptor[1].name}`);
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
