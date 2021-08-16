import * as express from 'express';
import { sendNotFound, sendSuccess } from '../../util/app/responseSenders';
import { get, getById, post, put, remove } from '../../util/data/crud.controller';
import { Transaction } from './Transaction';
import { transactionsRepository as repository } from './transactions.repository.factory';

export function getTransactions(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  get<Transaction>(req, res, next, repository);
}

export function getTransactionById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  getById(req, res, next, repository);
}

export async function getTransactionsByProjectId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const transactions = await repository.select();
    const result = transactions.filter(transaction => transaction.projectId === id);
    if (result) {
      sendSuccess(res, result);
    } else {
      sendNotFound(res);
    }
  } catch (err) {
    next(err);
  }
}

export function postTransaction(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  post(req, res, next, repository);
}
export async function putTransaction(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  await put(req, res, next, repository);
}

export function deleteTransaction(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  remove(req, res, next, repository);
}
