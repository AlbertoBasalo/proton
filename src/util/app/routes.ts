import * as OpenApiValidator from 'express-openapi-validator';
import { Express } from 'express-serve-static-core';
import { connector, summarise } from 'swagger-routes-express';
import YAML from 'yamljs';
import * as api from '../../api';
import { routerConfig } from '../config';
import { logger } from '../logger';
import { processAuthToken } from './auth';

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
      bearerAuth: processAuthToken,
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
