import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const jwtSecret = 'Prot0n';
const userTokenProperty = 'userToken';

export function processAuthToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(' ')[1];
    const userToken = jwt.verify(token, jwtSecret);
    setUserToken(req, userToken);
    next();
  } catch (err) {
    setUserToken(req, null);
    next(err);
  }
}
export function generateToken(payload: object) {
  return jwt.sign(payload, jwtSecret);
}
function setUserToken(req, userToken: string | object) {
  req[userTokenProperty] = userToken;
}
function getUserToken(req) {
  return req[userTokenProperty];
}

export function isOwner(req, target: object): boolean {
  const logedUser = getUserToken(req);
  if (!logedUser) return false;
  if (target === null) return false;
  const targetOwnerId = target[ownerProperty];
  if (!targetOwnerId) return false;
  return logedUser.id === targetOwnerId;
}
const ownerProperty = 'ownerId';
export function isForbidden(req, target: unknown): boolean {
  if (target === null) return false;
  const targetOwnerId = target[ownerProperty];
  if (targetOwnerId === undefined || targetOwnerId === null) return false;
  const logedUser = getUserToken(req);
  if (!logedUser) return true;
  return logedUser.id !== targetOwnerId;
}
export function setOwner(req, target: object) {
  const logedUser = getUserToken(req);
  if (!logedUser) return;
  if (!target) return;
  target[ownerProperty] = logedUser.id;
}

// ToDo: move from auth to a base util lib...

export function setId(req, target: object) {
  const id = target['id'];
  if (!!id) return;
  if (!!target['name']) {
    target['id'] = (target['name'] as string).toLocaleLowerCase().replace(' ', '');
  } else {
    target['id'] = new Date().getTime().toLocaleString();
  }
}
