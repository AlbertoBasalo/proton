import * as express from 'express';
import { httpStatus } from '../../models/httpStatus';

export function sendSuccess(res: express.Response, data: unknown, status = httpStatus.OK): void {
  res.status(status).json({ data });
}

export function sendEmpty(res: express.Response): void {
  res.sendStatus(httpStatus.NO_CONTENT);
}

export function sendCreated(res: express.Response, data: unknown): void {
  sendSuccess(res, data, httpStatus.CREATED);
}

export function sendNotFound(res: express.Response, message = 'Resource Not Found'): void {
  res.status(httpStatus.NOT_FOUND).json({ message });
}
export function sendConflict(res: express.Response, message = 'Conflict with current data'): void {
  res.status(httpStatus.CONFLICT).json({ message });
}

export function sendForbidden(res: express.Response, message = 'Not enough permissions'): void {
  res.status(httpStatus.FORBIDDEN).json({ message });
}

export function sendError(res: express.Response, message = 'Internal Error'): void {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message });
}
