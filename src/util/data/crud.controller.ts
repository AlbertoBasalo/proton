import * as express from 'express';
import { Repository } from '../../models/Repository';
import {
  sendConflict,
  sendCreated,
  sendEmpty,
  sendError,
  sendNotFound,
  sendSuccess,
} from '../app/responseSenders';

export async function get(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository
): Promise<void> {
  const result = await repository.select();
  sendSuccess(res, result);
}

export async function getById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository
): Promise<void> {
  const id = req.params.id;
  const result = await repository.selectById(id);
  if (result) {
    sendSuccess(res, result);
  } else {
    sendNotFound(next);
  }
}

export async function post(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository
): Promise<void> {
  const toAdd = req.body;
  const added = await repository.insert(toAdd);
  if (added) {
    sendCreated(res, added);
  } else {
    sendConflict(next);
  }
}

export async function put(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository
): Promise<void> {
  try {
    const id = req.params.id;
    const toUpdate = req.body;
    const updated = await repository.update(id, toUpdate);
    if (updated) {
      sendSuccess(res, updated);
    } else {
      sendNotFound(next);
    }
  } catch (error) {
    sendError(next, error.message);
  }
}

export async function remove(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository
): Promise<void> {
  const id = req.params.id;
  const removed = await repository.delete(id);
  if (removed) {
    sendEmpty(res);
  } else {
    sendNotFound(next);
  }
}
