import { MongoRepository } from '../../util/data/MongoRepository';
import { User } from './User';

export class UsersMongoRepository extends MongoRepository<User> {
  constructor() {
    super('users');
  }
}
