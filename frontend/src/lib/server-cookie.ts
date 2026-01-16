import { cookies } from 'next/headers';

export async function setServerCookie<T>(key: string,input: T) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7 days
  const payload = JSON.stringify(input);
  const cookie = await cookies();

  cookie.set(key, payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'strict',
    path: '/',
  });
}

export async function getServerCookie<T>(key:string): Promise<T | null> {
  const cookie = (await cookies()).get(key)?.value;
  if (!cookie) return null;
  return JSON.parse(cookie) as T;
}

export async function deleteServerCookie(key:string) {
  const session = await cookies();
  session.delete(key);
}