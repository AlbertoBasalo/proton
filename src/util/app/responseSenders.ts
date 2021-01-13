/* eslint-disable no-magic-numbers */
import * as express from 'express';
import { httpStatus } from '../../models/httpStatus';
import { ResponseError } from '../../models/ResponseError';

function getNotFound(message: string): ResponseError {
  return getError(message, httpStatus.NOT_FOUND);
}

function getConflict(message: string): ResponseError {
  return getError(message, httpStatus.CONFLICT);
}

function getError(
  message = 'Internal Error',
  status = httpStatus.INTERNAL_SERVER_ERROR
): ResponseError {
  const err: ResponseError = new Error(message);
  err.status = status;
  return err;
}

export function sendSuccess(res: express.Response, data: unknown, status = httpStatus.OK): void {
  res.status(status).json({ data });
}

export function sendEmpty(res: express.Response): void {
  res.sendStatus(httpStatus.NO_CONTENT);
}

export function sendCreated(res: express.Response, data: unknown): void {
  sendSuccess(res, data, httpStatus.CREATED);
}

export function sendNotFound(next: express.NextFunction, message = 'Resource Not Found'): void {
  next(getNotFound(message));
}
export function sendConflict(
  next: express.NextFunction,
  message = 'Conflict with current data'
): void {
  next(getConflict(message));
}

export function sendError(next: express.NextFunction, message = 'Internal Error'): void {
  next(getError(message));
}
