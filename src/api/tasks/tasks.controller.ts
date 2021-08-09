import * as express from 'express';
import { get, getById, post, put, remove } from '../../util/data/crud.controller';
import { Task } from './Task';
import { tasksRepository as repository } from './tasks.repository.factory';

export function getTasks(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  get<Task>(req, res, next, repository);
}

export function getTaskById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  getById(req, res, next, repository);
}

export function postTask(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  post(req, res, next, repository);
}
export async function putTask(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  await put(req, res, next, repository);
}

export function deleteTask(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  remove(req, res, next, repository);
}
