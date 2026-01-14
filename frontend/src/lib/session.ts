import { cookies } from 'next/headers';

export async function setSession<T>(input: T) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const payload = JSON.stringify(input);
  const session = await cookies();

  session.set('session', payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'strict',
    path: '/',
  });
}

export async function getSession<T>(): Promise<T | null> {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return JSON.parse(session) as T;
}

export async function deleteSession() {
  const session = await cookies();
  session.delete('session');
}