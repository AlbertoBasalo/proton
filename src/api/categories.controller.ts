import * as express from 'express';
import { sendConflict, sendCreated, sendEmpty, sendNotFound, sendSuccess } from '../util/responses';

const categories = [
  { id: '1', name: 'Libraries', description: 'Packages or source code' },
  { id: '2', name: 'UI components', description: 'Presentational frameworks and utilities' },
];

export function getCategories(req: express.Request, res: express.Response): void {
  sendSuccess(res, categories);
}

export function getCategoryById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.id;
  const result = categories.find(x => x.id === id);
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
  const added = req.body;
  const id = added.id;
  const index = categories.findIndex(x => x.id === id);
  if (index >= 0) {
    sendConflict(next);
  } else {
    categories.push(added);
    sendCreated(res, added);
  }
}
export function putCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.id;
  const index = categories.findIndex(x => x.id === id);
  if (index >= 0) {
    const updated = req.body;
    categories[index] = updated;
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
  const index = categories.findIndex(x => x.id === id);
  if (index >= 0) {
    categories.splice(index, 1);
    sendEmpty(res);
  } else {
    sendNotFound(next);
  }
}
