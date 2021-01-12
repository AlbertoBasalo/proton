export interface ResponseError extends Error {
  name: string;
  status?: number;
  stack?: string;
  errors?: unknown;
}
