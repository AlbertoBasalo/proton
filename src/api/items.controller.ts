import * as express from 'express';
import { sendConflict, sendCreated, sendEmpty, sendNotFound, sendSuccess } from '../util/responses';
import { itemsRepository as repository } from './items.repository';

export function getItems(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const categoryId = req.query.byCategory as string;
  if (categoryId) {
    const result = repository.selectByCategoryId(categoryId);
    if (result) {
      sendSuccess(res, result);
    } else {
      sendNotFound(next);
    }
  } else {
    const result = repository.select();
    sendSuccess(res, result);
  }
}

export function getItemById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.id;
  const result = repository.selectById(id);
  if (result) {
    sendSuccess(res, result);
  } else {
    sendNotFound(next);
  }
}

export function getItemsByCategoryId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const categoryId = req.params.id;
  const result = repository.selectByCategoryId(categoryId);
  if (result) {
    sendSuccess(res, result);
  } else {
    sendNotFound(next);
  }
}

export function postItem(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const toAdd = req.body;
  const added = repository.insert(toAdd);
  if (added) {
    sendCreated(res, added);
  } else {
    sendConflict(next);
  }
}
export function putItem(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
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

export function deleteItem(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.id;
  const removed = repository.delete(id);
  if (removed) {
    sendEmpty(res);
  } else {
    sendNotFound(next);
  }
}
