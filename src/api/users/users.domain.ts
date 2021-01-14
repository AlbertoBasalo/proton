import { logger } from '../../util/logger';
import { User } from './User';
import { usersRepository } from './users.repository.factory';

export async function registerUser(userToRegister: User): Promise<User | null> {
  userToRegister.id = userToRegister.name.toLocaleLowerCase().trim().replace(' ', '');
  userToRegister.activationToken = new Date().getTime().toString();
  const registeredUser = await usersRepository.insert(userToRegister);
  if (registeredUser) {
    logger.info(`📧 Sending ${registeredUser.activationToken} to ${registeredUser.email}`);
    return registeredUser;
  } else {
    return null;
  }
}

export async function activateUser(userToActivate: User): Promise<User | null> {
  const registeredUser = await usersRepository.selectById(userToActivate.id);
  if (registeredUser && registeredUser.activationToken === userToActivate.activationToken) {
    registeredUser.sessionToken = new Date().getTime().toString();
    await usersRepository.update(registeredUser.id, registeredUser);
    return registeredUser;
  } else {
    return null;
  }
}
