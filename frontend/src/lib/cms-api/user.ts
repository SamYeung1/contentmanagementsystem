import AuthException from '@/exception/api/auth-exception';
import PageResponse from '@/type/base/page-response';
import By from '@/type/base/by';
import Direction from '@/type/base/direction';
import { getCurrentUser } from '@/lib/user-session';
import { API, PAGINATION_OPTIONS } from '@/config/setting';
import { Role } from '@/type/cms';
import ApiException from '@/exception/api/api-exception';

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
  search?: string | null;
  page?: number | null;
  listAll?: boolean;
}

export interface UserCreateRequest {
  email: string;
  password:string;
  name:string;
  roles: string[];
}
export interface UserEditRequest extends Omit<UserCreateRequest,'password'>{
  password?: string;
}

export async function listUser(input: UserRequest): Promise<PageResponse<UserResponse>> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  let url = `${API.CMS_API}/users?orderBy[${input.orderBy.key}]=${input.orderBy.direction}`;
  if (input.search !== null && input.search !== undefined) {
    url += `&filter[like][name]=${input.search}&filter[like][email]=${input.search}`;
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
  return result as PageResponse<UserResponse>;
}

export async function createUser(input: UserCreateRequest): Promise<UserResponse> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/users`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(input),
    },
  );
  if (res.status === 401) {
    throw new AuthException();
  }
  if(!res.ok) {
    throw new ApiException();
  }
  const result = await res.json();
  return result as UserResponse;
}

export async function getUser(id: string): Promise<UserResponse> {
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
  if(!res.ok) {
    throw new ApiException();
  }
  const result = await res.json();

  if (!result) {
    throw new AuthException();
  }
  return result as UserResponse;
}

export async function editUser(id:string, input: UserEditRequest): Promise<UserResponse> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/users/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(input),
    },
  );
  if (res.status === 401) {
    throw new AuthException();
  }
  if(!res.ok) {
    throw new ApiException();
  }
  const result = await res.json();
  return result as UserResponse;
}
export async function deleteUser(id:string): Promise<boolean> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/users/${id}`,
    {
      method: 'DELETE',
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
  return true;
}