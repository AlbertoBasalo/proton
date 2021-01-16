import { nanoid } from 'nanoid';
import { generateToken } from '../../util/app/auth';
import { getB64FromObject, getObjectFromB64 } from '../../util/buffer';
import { rootConfig } from '../../util/config';
import { logger } from '../../util/logger';
import { sendMail } from '../../util/sendmail';
import { User } from './User';
import { usersRepository } from './users.repository.factory';

export async function registerUser(userToRegister: User): Promise<User | null> {
  setUserIdFrom(userToRegister);
  setUserActivationTokenId(userToRegister);
  const registeredUser = await usersRepository.insert(userToRegister);
  if (registeredUser) {
    const userActivationToken = getUserActivationToken(registeredUser);
    await sendActivationTokenByEmail(userActivationToken, registeredUser.email);
    return registeredUser;
  } else {
    return null;
  }
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
  userToRegister.atk = nanoid();
}

function getUserActivationToken(registeredUser: User) {
  const userActivationPayload = getUserActivationPayload(registeredUser);
  return getB64FromObject(userActivationPayload);
}

async function sendActivationTokenByEmail(userActivationToken: string, userEmail: string) {
  logger.warn(`📧 Sending ${userActivationToken} to ${userEmail}`);
  const server = `${rootConfig.serverDomain}:${rootConfig.port}`;
  const apiSegment = 'api/v1/users/activations';
  const tokenURL = `${server}/${apiSegment}?uat=${userActivationToken}`;
  const mailContent = `
      <p>Click here to activate your account</p>
      <a href="${tokenURL}">${userActivationToken}</a>`;
  const mailSubject = 'Your activation token';
  await sendMail(userEmail, mailSubject, mailContent);
}

function setSessionToken(registeredUser: User) {
  registeredUser.stk = nanoid();
}

function getToken(registeredUser: User) {
  const payload = { id: registeredUser.id, stk: registeredUser.stk };
  return generateToken(payload);
}

function getUserActivationPayload(registeredUser: User) {
  return (({ id, atk }) => ({ id, atk }))(registeredUser);
}
