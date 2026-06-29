import PageResponse from '@/type/base/page-response';
import By from '@/type/base/by';
import Direction from '@/type/base/direction';
import { getCurrentUser } from '@/lib/user-session';
import { API, PAGINATION_OPTIONS } from '@/config/setting';
import { handleError } from '@/lib/util';
import ApiException from '@/exception/api/api-exception';

interface PermissionResponse {
  id: number;
  name: string;
  action: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: By | null;
  updatedBy?: By | null;
}

interface PermissionListRequest {
  orderBy: Direction;
  search?: string | null;
  page?: number | null;
  listAll?: boolean;
}
export interface PermissionCreateRequest {
  action: string;
  name: string;
}


export interface PermissionEditRequest extends PermissionCreateRequest {
}
export async function listPermission(input: PermissionListRequest): Promise<PageResponse<PermissionResponse>> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  let url = `${API.CMS_API}/permissions?orderBy[${input.orderBy.key}]=${input.orderBy.direction}`;
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
  handleError(res);
  const result = await res.json();
  return result as PageResponse<PermissionResponse>;
}

export async function getPermission(id: string): Promise<PermissionResponse> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/permissions/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
    },
  );
  handleError(res);
  const result = await res.json();

  return result as PermissionResponse;
}
export async function createPermission(input: PermissionCreateRequest): Promise<PermissionResponse> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/permissions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(input),
    },
  );
  handleError(res);
  const result = await res.json();
  return result as PermissionResponse;
}

export async function editPermission(id: string, input: PermissionEditRequest): Promise<PermissionResponse> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/permissions/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(input),
    },
  );
  handleError(res);
  const result = await res.json();
  return result as PermissionResponse;
}

export async function deletePermission(id: string): Promise<boolean> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/permissions/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
    },
  );
  handleError(res);
  if (!res.ok) {
    throw new ApiException();
  }
  return true;
}