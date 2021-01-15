import { getB64FromObject, getObjectFromB64 } from '../../util/buffer';
import { logger } from '../../util/logger';
import { User } from './User';
import { usersRepository } from './users.repository.factory';

export async function registerUser(userToRegister: User): Promise<User | null> {
  userToRegister.id = userToRegister.name.toLocaleLowerCase().trim().replace(' ', '');
  userToRegister.atk = new Date().getTime().toString();
  const registeredUser = await usersRepository.insert(userToRegister);
  if (registeredUser) {
    const userActivationToken = getUserActivationToken(registeredUser);
    const b64 = getB64FromObject(userActivationToken);
    logger.info(`📧 Sending ${b64} to ${registeredUser.email}`);
    return registeredUser;
  } else {
    return null;
  }
}

export async function activateUser(userActivationTokenB64: string): Promise<User | null> {
  const userToActivate: Partial<User> = getObjectFromB64(userActivationTokenB64);
  console.log({ userToActivate });

  const registeredUser = await usersRepository.selectById(userToActivate.id);
  if (registeredUser && registeredUser.atk === userToActivate.atk) {
    registeredUser.stk = new Date().getTime().toString();
    await usersRepository.update(registeredUser.id, registeredUser);
    return registeredUser;
  } else {
    return null;
  }
}

function getUserActivationToken(registeredUser: User) {
  return (({ id, atk }) => ({ id, atk }))(registeredUser);
}
