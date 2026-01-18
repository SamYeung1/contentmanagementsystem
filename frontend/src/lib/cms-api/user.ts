import AuthException from '@/exception/api/auth-exception';
import PageResponse from '@/type/base/page-response';
import Role from '@/type/role';
import By from '@/type/base/by';
import Direction from '@/type/base/direction';
import { Encryption } from '@/lib/encryption';
import { decryptCurrentUserSession } from '@/lib/user-session';
import { PAGINATION_OPTIONS } from '@/config/setting';

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
  page?: number | null;
}

export async function list(input: UserRequest, token: string | (Encryption | null)): Promise<PageResponse<UserResponse>> {
  let bearerToken: string;
  if (typeof token !== 'string') {
    if (!token) {
      throw new Error('SID session does not exist!');
    }
    bearerToken = decryptCurrentUserSession(token).access_token;
  } else {
    bearerToken = token;
  }
  let url = `${process.env.CMS_API_BASE_URL}/users?orderBy[${input.orderBy.key}]=${input.orderBy.direction}`;
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

export async function get(id: string, token: string | (Encryption | null)): Promise<UserResponse> {
  let bearerToken: string;
  if (typeof token !== 'string') {
    if (!token) {
      throw new Error('SID session does not exist!');
    }
    bearerToken = decryptCurrentUserSession(token).access_token;
  } else {
    bearerToken = token;
  }
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