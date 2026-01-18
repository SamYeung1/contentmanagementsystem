'use server';
import { NextRequest } from 'next/server';
import { list, get } from '@/lib/cms-api/user';
import { getSession } from '@/lib/user-session';

export async function GET(req: NextRequest, ctx: RouteContext<'/api/user/[[...id]]'>) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.has('page') ? parseInt(searchParams.get('page')!) : null;
  const userSession = await getSession();
  const { id } = await ctx.params;
  if (id) {
    return Response.json(await get(id[0], userSession));
  } else {
    return Response.json(await list({ page: page, orderBy: { key: 'id', direction: 'ASC' } }, userSession));
  }

}