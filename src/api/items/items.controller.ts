import * as express from 'express';
import { sendNotFound, sendSuccess } from '../../util/app/responseSenders';
import { get, getById, post, put, remove } from '../../util/data/crud.controller';
import { Item } from './Item';
import { itemsRepository as repository } from './items.repository.factory';

export async function getItems(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const categoryId = req.query.byCategory as string;
  if (categoryId) {
    const result = (await repository.selectByCategoryId(categoryId)) as Item[];
    if (result) {
      sendSuccess(res, result);
    } else {
      sendNotFound(res);
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

export async function getItemsByCategoryId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const categoryId = req.params.id;
  console.log('getItemsByCategoryId: ' + categoryId);
  const result = await repository.selectByCategoryId(categoryId);
  if (result) {
    sendSuccess(res, result);
  } else {
    sendNotFound(res);
  }
}

export async function getItemsMetadataByCategoryId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const categoryId = req.params.id;
  const result = await repository.countByCategoryId(categoryId);
  if (result) {
    sendSuccess(res, result);
  } else {
    sendNotFound(res);
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
