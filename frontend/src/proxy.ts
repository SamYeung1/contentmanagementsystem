import { NextRequest, NextResponse } from 'next/server';
import { LoginResponse } from '@/lib/cms-api/auth';
import { refresh } from '@/lib/cms-api/auth';
import { getSession, storeSession, decryptCurrentUserSession,deleteSession } from '@/lib/user-session';

// 1. Specify public routes
const publicRoutes = ['/'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  try {
    const session = await getSession();
    if (isPublicRoute && !session) {
      return NextResponse.next();
    }
    if (!isPublicRoute && !session) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    const decodedSession: LoginResponse = decryptCurrentUserSession(session);
    if (!isPublicRoute && decodedSession.access_token) {
      const expirationTimestamp = new Date(decodedSession.expires_in);
      if (new Date().getTime() >= expirationTimestamp.getTime()) {
        const refreshResult = await refresh({ refresh_token: decodedSession.refresh_token });
        if (refreshResult) {
          await storeSession<LoginResponse>(refreshResult);
        }
      }
    }
    if (
      isPublicRoute &&
      decodedSession.access_token &&
      !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  } catch (error) {
    console.error(error);
    if (isPublicRoute) {
      return NextResponse.next();
    }
    await deleteSession();
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};