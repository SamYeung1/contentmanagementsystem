'use server';
import { NextRequest } from 'next/server';
import { listUser, getUser, deleteUser } from '@/lib/cms-api/user';
import Direction from '@/type/base/direction';

export async function GET(req: NextRequest, ctx: RouteContext<'/api/user/[[...id]]'>) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.has('page') ? parseInt(searchParams.get('page')!) : null;
  const listAll = searchParams.has('listAll') ? parseInt(searchParams.get('listAll')!) === 1 : false;
  const orderBy = searchParams.has('orderBy') ? JSON.parse(searchParams.get('orderBy')!) : {
    key: 'id',
    direction: 'ASC',
  };
  const search = searchParams.has('search') ? searchParams.get('search') : null;
  const { id } = await ctx.params;
  try {
    if (id) {
      return Response.json(await getUser(id[0]));
    } else {
      return Response.json(await listUser({
        page: page,
        orderBy: orderBy as Direction,
        search: search,
        listAll: listAll,
      }));
    }
  } catch (e) {
    return Response.json({}, { status: 404 });
  }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/user/[[...id]]'>) {
  const { id } = await ctx.params;
  try {
    if (id) {
      return Response.json(await deleteUser(id[0]));
    } else {
      return Response.json({}, { status: 404 });
    }
  }catch (e) {
    return Response.json({}, { status: 500 });
  }

}