import { MemoryRepository } from '../../util/data/MemoryRepository';
import { Item } from './Item';

export class ItemsMemoryRepository extends MemoryRepository<Item> {
  constructor() {
    const collection: Item[] = [
      {
        id: '1',
        categoryId: '1',
        name: 'RxJs',
        description: 'Asynchronous and event-based programs by using observable sequences',
        url: 'https://rxjs-dev.firebaseapp.com/guide/overview',
      },
      {
        id: '2',
        categoryId: '2',
        name: 'Angular Material',
        description: 'Material Design components for mobile and desktop web applications',
        url: 'https://material.angular.io/',
      },
      {
        id: '3',
        categoryId: '2',
        name: 'Taiga UI',
        description: 'Powerful set of customizable components',
        url: 'https://taiga-ui.dev/',
      },
    ];

    super(collection);
  }
  public selectByCategoryId(id: string): Item[] {
    return this.collection.filter(x => x.categoryId === id);
  }
  public countByCategoryId(id: string): number {
    return this.collection.filter(x => x.categoryId === id).length;
  }
}
