import * as express from 'express';
import { get, getById, post, put, remove } from '../../util/data/crud.controller';
import { Project } from './Project';
import { projectsRepository as repository } from './projects.repository.factory';

export function getProjects(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  get<Project>(req, res, next, repository);
}

export function getProjectById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  getById(req, res, next, repository);
}

export function postProject(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  post(req, res, next, repository);
}
export async function putProject(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  await put(req, res, next, repository);
}

export function deleteProject(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  remove(req, res, next, repository);
}
