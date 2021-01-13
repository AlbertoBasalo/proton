/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

class CategoriesRepository {
  private readonly collection = [
    { id: '1', name: 'Libraries', description: 'Packages or source code' },
    { id: '2', name: 'UI components', description: 'Presentational frameworks and utilities' },
  ];

  public select(): unknown[] {
    return this.collection;
  }

  public selectById(id: string): unknown {
    return this.collection.find(x => x.id === id);
  }

  public insert(toAdd: any): unknown {
    const id = toAdd.id;
    const index = this.collection.findIndex(x => x.id === id);
    if (index >= 0) {
      return null;
    } else {
      this.collection.push(toAdd);
      return toAdd;
    }
  }

  public update(id: string, toUpdate: any): unknown {
    const index = this.collection.findIndex(x => x.id === id);
    if (index >= 0) {
      this.collection[index] = toUpdate;
      return toUpdate;
    } else {
      return null;
    }
  }

  public delete(id: string): unknown {
    const index = this.collection.findIndex(x => x.id === id);
    if (index >= 0) {
      this.collection.splice(index, 1);
      return true;
    } else {
      return null;
    }
  }
}

export const categoriesRepository = new CategoriesRepository();
