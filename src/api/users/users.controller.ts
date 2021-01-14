import * as express from 'express';
import {
  sendConflict,
  sendCreated,
  sendNotFound,
  sendSuccess,
} from '../../util/app/responseSenders';
import { getById, remove } from '../../util/data/crud.controller';
import { User } from './User';
import { activateUser, registerUser } from './users.domain';
import { usersRepository as repository } from './users.repository.factory';

export function getUserById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  getById(req, res, next, repository);
}

export async function postUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  try {
    const userToRegister = req.body as User;
    const registeredUser = await registerUser(userToRegister);
    if (registeredUser) sendCreated(res, registeredUser);
    else sendConflict(res, 'User could not be registered');
  } catch (err) {
    next(err);
  }
}
export async function putUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  try {
    const userToActivate = req.body as User;
    const activatedUser = await activateUser(userToActivate);
    if (activatedUser) {
      sendSuccess(res, activatedUser);
    } else {
      sendNotFound(res, 'Invalid activation token');
    }
  } catch (err) {
    next(err);
  }
}

export function deleteUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  remove(req, res, next, repository);
}
