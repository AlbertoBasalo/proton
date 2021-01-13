import * as express from 'express';
import { sendNotFound, sendSuccess } from '../../util/app/responseSenders';
import { get, getById, post, put, remove } from '../../util/data/crud.controller';
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
    get(req, res, next, repository);
  }
}

export function getItemById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  getById(req, res, next, repository);
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
  post(req, res, next, repository);
}
export function putItem(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  put(req, res, next, repository);
}

export function deleteItem(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  remove(req, res, next, repository);
}
