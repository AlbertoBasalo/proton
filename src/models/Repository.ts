/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Repository {
  select(): unknown[] | Promise<unknown[]>;
  selectById(id: string): unknown | Promise<unknown>;
  insert(toAdd: any): unknown | Promise<unknown>;
  update(id: string, toUpdate: any): unknown | Promise<unknown>;
  delete(id: string): unknown | Promise<unknown>;
}
