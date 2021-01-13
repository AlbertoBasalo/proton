import * as express from 'express';
import { sendConflict, sendCreated, sendEmpty, sendNotFound, sendSuccess } from '../util/responses';
import { categoriesRepository } from './categories.repository';

export function getCategories(req: express.Request, res: express.Response): void {
  const result = categoriesRepository.select();
  sendSuccess(res, result);
}

export function getCategoryById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.id;
  const result = categoriesRepository.selectById(id);
  if (result) {
    sendSuccess(res, result);
  } else {
    sendNotFound(next);
  }
}
export function postCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const toAdd = req.body;
  const added = categoriesRepository.insert(toAdd);
  if (added) {
    sendCreated(res, added);
  } else {
    sendConflict(next);
  }
}
export function putCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.id;
  const toUpdate = req.body;
  const updated = categoriesRepository.update(id, toUpdate);
  if (updated) {
    sendSuccess(res, updated);
  } else {
    sendNotFound(next);
  }
}

export function deleteCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.id;
  const removed = categoriesRepository.delete(id);
  if (removed >= 0) {
    sendEmpty(res);
  } else {
    sendNotFound(next);
  }
}
