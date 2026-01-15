import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServerCookie } from '@/lib/server-cookie';
import { UserResponse } from '@/type';
import { decryptData, Encryption } from '@/lib/encryption';
import { AuthResponse } from '@/lib/cms-api/auth';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/user'];
const publicRoutes = ['/'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const session = await getServerCookie<Encryption>('sid');
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  if (isProtectedRoute && session && !session.encryptedKey && !session.encryptedData && !session.authTag && !session.iv) {
    return NextResponse.redirect(new URL('/', req.nextUrl));

  }
  try {
    let decodedSession = JSON.parse(decryptData(session!!.encryptedKey, session!!.iv, session!!.encryptedData, session!!.authTag)) as AuthResponse;

  }catch(error) {
    console.error(error);
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  // // 5. Redirect to /dashboard if the user is authenticated
  // if (
  //   isPublicRoute &&
  //   session?.id &&
  //   !req.nextUrl.pathname.startsWith('/dashboard')
  // ) {
  //   return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  // }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};