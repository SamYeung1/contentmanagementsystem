'use server';
import { NextRequest } from 'next/server';
import { listUser, getUser } from '@/lib/cms-api/role';
import Direction from '@/type/base/direction';

export async function GET(req: NextRequest, ctx: RouteContext<'/api/role/[[...id]]'>) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.has('page') ? parseInt(searchParams.get('page')!) : null;
  const listAll = searchParams.has('listAll') ? parseInt(searchParams.get('listAll')!) === 1 : false;
  const orderBy = searchParams.has('orderBy') ? JSON.parse(searchParams.get('orderBy')!) : {
    key: 'id',
    direction: 'ASC',
  };
  const search = searchParams.has('search') ? searchParams.get('search') : null;
  const { id } = await ctx.params;
  if (id) {
    return Response.json(await getUser(id[0]));
  } else {
    return Response.json(await listUser({ page: page, orderBy: orderBy as Direction, search: search,listAll:listAll }));
  }

}