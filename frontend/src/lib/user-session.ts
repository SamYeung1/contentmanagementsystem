import { decryptData, encryptData, Encryption } from '@/lib/encryption';
import { deleteServerCookie, getServerCookie, setServerCookie } from '@/lib/server-cookie';
import { LoginResponse } from '@/lib/cms-api/auth';


const SESSION_KEY = 'sid';
export async function storeSession<T>(input: T) {
  const encryptedData: Encryption = encryptData(JSON.stringify(input));
  await setServerCookie<Encryption>(SESSION_KEY, encryptedData);
}

export function getSession(): Promise<Encryption | null> {
  return getServerCookie<Encryption>(SESSION_KEY);
}

export function decryptCurrentUserSession(session: Encryption | null): LoginResponse {
  if (!session) {
    throw new Error('SID session does not exist!');
  }
  return JSON.parse(decryptData(session!!.encryptedKey, session!!.iv, session!!.encryptedData, session!!.authTag)) as LoginResponse;

}

export async function deleteSession() {
  await deleteServerCookie(SESSION_KEY);
}

export async function getCurrentUser() {
  const userSession = await getSession();
  if (!userSession) {
    throw new Error('SID session does not exist!');
  }
  return decryptCurrentUserSession(userSession);
}