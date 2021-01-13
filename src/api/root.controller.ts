import * as express from 'express';

export function test(req: express.Request, res: express.Response): void {
  const message = `Hello, everything is fine`;
  res.json({ message });
}
