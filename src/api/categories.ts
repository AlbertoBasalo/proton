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
