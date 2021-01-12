import * as express from 'express';
import {
  sendConflict,
  sendCreated,
  sendEmpty,
  sendNotFound,
  sendSuccess,
} from './../util/responses';

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
  const id = req.params.categoryId;
  const category = categories.find(c => c.id === id);
  if (category) {
    sendSuccess(res, category);
  } else {
    sendNotFound(next);
  }
}
export function postCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const newCategory = req.body;
  const id = newCategory.id;
  const categoryIndex = categories.findIndex(c => c.id === id);
  if (categoryIndex >= 0) {
    sendConflict(next);
  } else {
    categories.push(newCategory);
    sendCreated(res, newCategory);
  }
}
export function putCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.categoryId;
  const categoryIndex = categories.findIndex(c => c.id === id);
  if (categoryIndex >= 0) {
    const updatedCategory = req.body;
    categories[categoryIndex] = updatedCategory;
    sendSuccess(res, updatedCategory);
  } else {
    sendNotFound(next);
  }
}

export function deleteCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.categoryId;
  const categoryIndex = categories.findIndex(c => c.id === id);
  if (categoryIndex >= 0) {
    categories.splice(categoryIndex, 1);
    sendEmpty(res);
  } else {
    sendNotFound(next);
  }
}
