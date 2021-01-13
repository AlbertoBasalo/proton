export interface Repository {
  select(): unknown[];
  selectById(id: string): unknown;
  insert(toAdd: any): unknown;
  update(id: string, toUpdate: any): unknown;
  delete(id: string): unknown;
}
