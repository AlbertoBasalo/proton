import * as express from 'express';
import { sendConflict, sendCreated, sendEmpty, sendNotFound, sendSuccess } from '../util/responses';

const items = [
  {
    id: '1',
    categoryId: '1',
    name: 'RxJs',
    description: 'Asynchronous and event-based programs by using observable sequences',
    url: 'https://rxjs-dev.firebaseapp.com/guide/overview',
  },
  {
    id: '2',
    categoryId: '2',
    name: 'Angular Material',
    description: 'Material Design components for mobile and desktop web applications',
    url: 'https://material.angular.io/',
  },
  {
    id: '3',
    categoryId: '2',
    name: 'Taiga UI',
    description: 'Powerful set of customizable components',
    url: 'https://taiga-ui.dev/',
  },
];

export function getItems(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const categoryId = req.query.byCategory;
  if (categoryId) {
    const result = items.filter(x => x.categoryId === categoryId);
    if (result) {
      sendSuccess(res, result);
    } else {
      sendNotFound(next);
    }
  } else {
    sendSuccess(res, items);
  }
}

export function getItemById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.id;
  const result = items.find(x => x.id === id);
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
  const result = items.filter(x => x.categoryId === categoryId);
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
  const added = req.body;
  const id = added.id;
  const index = items.findIndex(x => x.id === id);
  if (index >= 0) {
    sendConflict(next);
  } else {
    items.push(added);
    sendCreated(res, added);
  }
}
export function putItem(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const id = req.params.id;
  const index = items.findIndex(x => x.id === id);
  if (index >= 0) {
    const updated = req.body;
    items[index] = updated;
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
  const index = items.findIndex(x => x.id === id);
  if (index >= 0) {
    items.splice(index, 1);
    sendEmpty(res);
  } else {
    sendNotFound(next);
  }
}
