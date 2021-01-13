/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const collection = [
  { id: '1', name: 'Libraries', description: 'Packages or source code' },
  { id: '2', name: 'UI components', description: 'Presentational frameworks and utilities' },
];

export function select(): unknown[] {
  return collection;
}

export function selectById(id: string): unknown {
  return collection.find(x => x.id === id);
}

export function insert(toAdd: any): unknown {
  const id = toAdd.id;
  const index = collection.findIndex(x => x.id === id);
  if (index >= 0) {
    return null;
  } else {
    collection.push(toAdd);
    return toAdd;
  }
}

export function update(id: string, toUpdate: any): unknown {
  const index = collection.findIndex(x => x.id === id);
  if (index >= 0) {
    collection[index] = toUpdate;
    return toUpdate;
  } else {
    return null;
  }
}

export function remove(id: string): unknown {
  const index = collection.findIndex(x => x.id === id);
  if (index >= 0) {
    collection.splice(index, 1);
    return true;
  } else {
    return null;
  }
}
