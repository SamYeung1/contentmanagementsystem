'use server';
import { logout } from '@/lib/cms-api/auth';
import PermissionException from '@/exception/api/permission-exception';
import { deleteSession } from '@/lib/user-session';

function handleError(e: unknown) {
  console.error(e);
  if (e instanceof PermissionException) {
    return Response.json({}, { status: 403 });
  }
  return Response.json({}, { status: 404 });
}

export async function POST(req: Request) {
  try {
    await logout();
    await deleteSession();
    return Response.json({});
  } catch (e) {
    return handleError(e);
  }
}