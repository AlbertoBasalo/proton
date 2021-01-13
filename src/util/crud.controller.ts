import * as express from 'express';
import { Repository } from '../models/Repository';
import { sendConflict, sendCreated, sendEmpty, sendNotFound, sendSuccess } from './responses';

export function get(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository
): void {
  const result = repository.select();
  sendSuccess(res, result);
}

export function getById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository
): void {
  const id = req.params.id;
  const result = repository.selectById(id);
  if (result) {
    sendSuccess(res, result);
  } else {
    sendNotFound(next);
  }
}

export function post(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository
): void {
  const toAdd = req.body;
  const added = repository.insert(toAdd);
  if (added) {
    sendCreated(res, added);
  } else {
    sendConflict(next);
  }
}

export function put(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository
): void {
  const id = req.params.id;
  const toUpdate = req.body;
  const updated = repository.update(id, toUpdate);
  if (updated) {
    sendSuccess(res, updated);
  } else {
    sendNotFound(next);
  }
}

export function remove(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository
): void {
  const id = req.params.id;
  const removed = repository.delete(id);
  if (removed) {
    sendEmpty(res);
  } else {
    sendNotFound(next);
  }
}
