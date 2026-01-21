import AuthException from '@/exception/api/auth-exception';
import PageResponse from '@/type/base/page-response';
import Role from '@/type/cms/role';
import By from '@/type/base/by';
import Direction from '@/type/base/direction';
import {getCurrentUser } from '@/lib/user-session';
import { API, PAGINATION_OPTIONS } from '@/config/setting';

interface UserResponse {
  id: number;
  email: string;
  name: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  createdBy?: By | null;
  updatedBy?: By | null;
}

interface UserRequest {
  orderBy: Direction;
  search?:string | null;
  page?: number | null;
}

export async function list(input: UserRequest): Promise<PageResponse<UserResponse>> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  let url = `${API.CMS_API}/users?orderBy[${input.orderBy.key}]=${input.orderBy.direction}`;
  if(input.search !== null && input.search !== undefined) {
    url += `&filter[like][name]=${input.search}&filter[like][email]=${input.search}`;
  }
  if (input.page !== null && input.page !== undefined) {
    url += `&paginate[limit]=${PAGINATION_OPTIONS.limit}&paginate[page]=${input.page}`;
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
  const result = await res.json();

  if (!result) {
    throw new AuthException();
  }
  return result as PageResponse<UserResponse>;
}

export async function get(id: string): Promise<UserResponse> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/users/${id}`,
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

  const result = await res.json();

  if (!result) {
    throw new AuthException();
  }
  return result as UserResponse;
}