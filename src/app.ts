import express from 'express';
import { Express } from 'express-serve-static-core';

export async function createApp(): Promise<Express> {
  const app = express();
  return app;
}
