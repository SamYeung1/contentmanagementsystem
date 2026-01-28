import AuthException from '@/exception/api/auth-exception';
import PageResponse from '@/type/base/page-response';
import By from '@/type/base/by';
import Direction from '@/type/base/direction';
import { getCurrentUser } from '@/lib/user-session';
import { API, PAGINATION_OPTIONS } from '@/config/setting';
import { Permission } from '@/type/cms';
import ApiException from '@/exception/api/api-exception';

interface RoleResponse {
  id: number;
  name: string;
  permission: Permission[];
  createdAt: string;
  updatedAt: string;
  createdBy?: By | null;
  updatedBy?: By | null;
}

interface RoleRequest {
  orderBy: Direction;
  search?: string | null;
  page?: number | null;
  listAll?: boolean;
}


export async function listUser(input: RoleRequest): Promise<PageResponse<RoleResponse>> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  let url = `${API.CMS_API}/roles?orderBy[${input.orderBy.key}]=${input.orderBy.direction}`;
  if (input.search !== null && input.search !== undefined) {
    url += `&filter[like][name]=${input.search}`;
  }
  if (input.page !== null && input.page !== undefined) {
    url += `&paginate[limit]=${input.listAll === false || input.listAll === undefined ? PAGINATION_OPTIONS.limit : 0}&paginate[page]=${input.listAll === false || input.listAll === undefined ? input.page : 1}`;
  }
  const res = await fetch(
    url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
    },
  );
  if (res.status === 401) {
    throw new AuthException();
  }
  if(!res.ok) {
    throw new ApiException();
  }
  const result = await res.json();
  return result as PageResponse<RoleResponse>;
}

export async function getUser(id: string): Promise<RoleResponse> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/roles/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
    },
  );
  if (res.status === 401) {
    throw new AuthException();
  }
  if(!res.ok) {
    throw new ApiException();
  }
  const result = await res.json();

  return result as RoleResponse;
}