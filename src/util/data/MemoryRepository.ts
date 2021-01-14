import { Repository } from '../../models/Repository';

export abstract class MemoryRepository<T> implements Repository<T> {
  constructor(protected readonly collection: T[], protected readonly key = 'id') {}

  public select(): T[] {
    return this.collection;
  }

  public selectById(id: string): T {
    return this.collection.find(x => this.isEqualKey(x, id));
  }
  public insert(toAdd: T): T {
    const id = this.getKey(toAdd);
    const index = this.collection.findIndex(x => this.isEqualKey(x, id));
    if (index >= 0) {
      return null;
    } else {
      this.collection.push(toAdd);
      return toAdd;
    }
  }

  public update(id: string, toUpdate: Partial<T>): T {
    const index = this.collection.findIndex(x => this.isEqualKey(x, id));
    if (index >= 0) {
      const current: T = this.collection[index];
      const updated = { current, ...toUpdate } as unknown;
      this.collection[index] = updated as T;
      return this.collection[index];
    } else {
      return null;
    }
  }

  public delete(id: string): boolean {
    const index = this.collection.findIndex(x => this.isEqualKey(x, id));
    if (index >= 0) {
      this.collection.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  private isEqualKey(entity: T, keyValue: string): boolean {
    return entity[this.key] === keyValue;
  }
  private getKey(entity: T): string {
    return entity[this.key];
  }
}
