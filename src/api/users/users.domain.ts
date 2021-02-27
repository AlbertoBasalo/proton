import { generateToken } from '../../util/app/auth';
import { getB64FromObject, getObjectFromB64 } from '../../util/buffer';
import { logger } from '../../util/logger';
import { User } from './User';
import { usersRepository } from './users.repository.factory';

export async function registerUser(userToRegister: User): Promise<User | null> {
  setUserIdFrom(userToRegister);
  setUserActivationTokenId(userToRegister);
  const alreadyUsers = await getAleadyRegistered(userToRegister);
  let registeredUser: User = null;
  if (alreadyUsers && alreadyUsers[0]) {
    registeredUser = alreadyUsers[0];
  } else {
    registeredUser = await usersRepository.insert(userToRegister);
  }
  if (registeredUser) {
    const userActivationToken = getUserActivationToken(registeredUser);
    logger.warn(`📧 Sending ${userActivationToken} to ${registeredUser.email}`);
    registeredUser.atk = userActivationToken;
    return registeredUser;
  } else {
    return null;
  }
}

async function getAleadyRegistered(userToCheck: User): Promise<User[] | null> {
  return usersRepository.selectByQuery({ email: userToCheck.email });
}

function setUserIdFrom(userToRegister: User) {
  if (userToRegister.name) {
    userToRegister.id = userToRegister.name.toLocaleLowerCase().trim().replace(' ', '');
    return;
  }
  if (userToRegister.email) {
    userToRegister.id = userToRegister.email;
    return;
  }
  throw new Error('Invalid data; User needs name or email');
}

function setUserActivationTokenId(userToRegister: User) {
  userToRegister.atk = new Date().getTime().toString();
}

export async function activateUser(userActivationTokenB64: string): Promise<string | null> {
  const userToActivate: Partial<User> = getObjectFromB64(userActivationTokenB64);
  const registeredUser = await usersRepository.selectById(userToActivate.id);
  if (registeredUser && registeredUser.atk === userToActivate.atk) {
    setSessionToken(registeredUser);
    await usersRepository.update(registeredUser.id, registeredUser);
    return getToken(registeredUser);
  } else {
    return null;
  }
}

function getUserActivationToken(registeredUser: User) {
  const userActivationPayload = getUserActivationPayload(registeredUser);
  const userActivationToken = getB64FromObject(userActivationPayload);
  return userActivationToken;
}

function setSessionToken(registeredUser: User) {
  registeredUser.stk = new Date().getTime().toString();
}

function getToken(registeredUser: User) {
  const payload = { id: registeredUser.id, stk: registeredUser.stk };
  const tokenPayload = generateToken(payload);
  return tokenPayload;
}

function getUserActivationPayload(registeredUser: User) {
  return (({ id, atk }) => ({ id, atk }))(registeredUser);
}
