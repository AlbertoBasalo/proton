import { MemoryRepository } from '../util/MemoryRepository';

class ItemsRepository extends MemoryRepository {
  constructor() {
    const collection = [
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
  public selectByCategoryId(id: string): unknown {
    return this.collection.filter(x => x.categoryId === id);
  }
}

export const itemsRepository = new ItemsRepository();
