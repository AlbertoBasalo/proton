import { MemoryRepository } from '../../util/data/MemoryRepository';
import { User } from './User';

export class UsersMemoryRepository extends MemoryRepository<User> {
  constructor() {
    const collection: User[] = [
      {
        id: 'world_admin',
        name: 'World Admin',
        email: 'admin@world.org',
        password: 'S3cr3t!',
      },
    ];

    super(collection);
  }
}
