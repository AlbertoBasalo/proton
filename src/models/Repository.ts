export interface Repository<T> {
  select(): T[] | Promise<T[]>;
  selectById(id: string): T | Promise<T | null>;
  insert(toAdd: T): T | Promise<T>;
  update(id: string, toUpdate: Partial<T>): T | Promise<T>;
  delete(id: string): boolean | Promise<boolean>;
}
