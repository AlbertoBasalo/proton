import * as express from 'express';
import { ResponseError } from '../models/ResponseError';

const categories = [
  { id: '1', name: 'Libraries', description: 'Packages or source code' },
  { id: '2', name: 'UI components', description: 'Presentational frameworks and utilities' },
];

export function getCategories(req: express.Request, res: express.Response): void {
  res.json({ categories });
}

export function getCategoryById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.categoryId;
  const category = categories.find(c => c.id === id);
  if (category) {
    res.json(category);
  } else {
    const err: ResponseError = new Error(`Category with id ${id} was not found`);
    err.status = 404;
    next(err);
  }
}
export function postCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const newCategory = req.body;
  const id = newCategory.id;
  const category = categories.find(c => c.id === id);
  if (category) {
    const err: ResponseError = new Error(`Category with id ${id} already found`);
    err.status = 409;
    next(err);
  } else {
    categories.push(newCategory);
    res.status(201).json({ newCategory });
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
    res.json(updatedCategory);
  } else {
    const err: ResponseError = new Error(`Category with id ${id} was not found`);
    err.status = 404;
    next(err);
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
    res.sendStatus(204);
  } else {
    const err: ResponseError = new Error(`Category with id ${id} was not found`);
    err.status = 404;
    next(err);
  }
}
