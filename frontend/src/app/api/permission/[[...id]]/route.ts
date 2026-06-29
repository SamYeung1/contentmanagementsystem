'use server';
import { NextRequest } from 'next/server';
import { listPermission, getPermission } from '@/lib/cms-api/permission';
import Direction from '@/type/base/direction';
import { deletePermission } from '@/lib/cms-api/permission';
import { handleErrorAPI } from '@/lib/util';

export async function GET(req: NextRequest, ctx: RouteContext<'/api/permission/[[...id]]'>) {
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
    return Response.json(await getPermission(id[0]));
  } else {
    return Response.json(await listPermission({ page: page, orderBy: orderBy as Direction, search: search,listAll:listAll }));
  }

}
export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/permission/[[...id]]'>) {
  const { id } = await ctx.params;
  try {
    if (id) {
      return Response.json(await deletePermission(id[0]));
    } else {
      return Response.json({}, { status: 404 });
    }
  }catch (e) {
    return handleErrorAPI(e);
  }

}