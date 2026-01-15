import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServerCookie } from '@/lib/server-cookie';
import { UserResponse } from '@/type';
import { decryptData, Encryption } from '@/lib/encryption';
import { LoginResponse } from '@/lib/cms-api/auth';

// 1. Specify public routes
const publicRoutes = ['/'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  try {
    const session = await getServerCookie<Encryption>('sid');
    if (!isPublicRoute && !session) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    const decodedSession: LoginResponse = JSON.parse(decryptData(session!!.encryptedKey, session!!.iv, session!!.encryptedData, session!!.authTag)) as LoginResponse;
    if (!isPublicRoute && decodedSession.access_token) {
      const expirationTimestamp = new Date(decodedSession.expires_in);
      if(new Date().getTime() >= expirationTimestamp.getTime()) {
          console.log("call refresh",new Date());
      }
      console.log("Current Time:", new Date(Date.now()));
      console.log("Expires At:", new Date(expirationTimestamp));
    }
    if (
      isPublicRoute &&
      decodedSession.access_token &&
      !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }
  } catch (error) {
    console.error(error);
    if (isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};