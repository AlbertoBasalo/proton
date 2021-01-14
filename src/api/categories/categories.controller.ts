import * as express from 'express';
import { get, getById, post, put, remove } from '../../util/data/crud.controller';
import { categoriesRepository as repository } from './categories.repository.factory';
import { Category } from './Category';

export function getCategories(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  get<Category>(req, res, next, repository);
}

export function getCategoryById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  getById(req, res, next, repository);
}

export function postCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  post(req, res, next, repository);
}
export async function putCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  await put(req, res, next, repository);
}

export function deleteCategory(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  remove(req, res, next, repository);
}
