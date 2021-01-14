import * as express from 'express';
import { Repository } from '../../models/Repository';
import {
  sendConflict,
  sendCreated,
  sendEmpty,
  sendNotFound,
  sendSuccess,
} from '../app/responseSenders';

export async function get<T>(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository<T>
): Promise<void> {
  try {
    const result = await repository.select();
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getById<T>(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository<T>
): Promise<void> {
  try {
    const id = req.params.id;
    const result = await repository.selectById(id);
    if (result) {
      sendSuccess(res, result);
    } else {
      sendNotFound(res);
    }
  } catch (err) {
    next(err);
  }
}

export async function post<T>(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository<T>
): Promise<void> {
  try {
    const toAdd = req.body;
    const added = await repository.insert(toAdd);
    if (added) {
      sendCreated(res, added);
    } else {
      sendConflict(res);
    }
  } catch (err) {
    next(err);
  }
}

export async function put<T>(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository<T>
): Promise<void> {
  try {
    const id = req.params.id;
    const toUpdate = req.body;
    const updated = await repository.update(id, toUpdate);
    if (updated) {
      sendSuccess(res, updated);
    } else {
      sendNotFound(res);
    }
  } catch (err) {
    next(err);
  }
}

export async function remove<T>(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  repository: Repository<T>
): Promise<void> {
  try {
    const id = req.params.id;
    const removed = await repository.delete(id);
    if (removed) {
      sendEmpty(res);
    } else {
      sendNotFound(res);
    }
  } catch (err) {
    next(err);
  }
}
