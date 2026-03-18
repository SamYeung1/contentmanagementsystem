import AuthException from '@/exception/api/auth-exception';
import { getCurrentUser } from '@/lib/user-session';
import { API } from '@/config/setting';
import { handleError } from '@/lib/util';
import { Role } from '@/type/cms';

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface CurrentUserResponse {
  id: number;
  email: string;
  name: string;
  permissions: {
    action: string;
    resource: string
  }[];
  isRootUser: boolean;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateCurrentUserRequest {
  password?: string;
  name: string;
  roles: string[];
}
export interface GetCurrentUserResponse {
  id: number;
  email: string;
  name: string;
  roles: Role[];
}
export async function login(input: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(
    `${API.CMS_API}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  );
  handleError(res);
  const auth = await res.json();

  if (!auth) {
    throw new AuthException();
  }
  const bufferTime = 2 * 60; // 2 mins
  auth.expires_in = Date.now() + ((auth.expires_in - bufferTime) * 1000);
  return auth as LoginResponse;
}

export async function refresh(input: RefreshRequest): Promise<LoginResponse> {
  const res = await fetch(
    `${API.CMS_API}/auth/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  );
  handleError(res);
  const auth = await res.json();
  if (!auth) {
    throw new AuthException();
  }
  const bufferTime = 2 * 60; // 2 mins
  auth.expires_in = Date.now() + ((auth.expires_in - bufferTime) * 1000);
  return auth as LoginResponse;
}

export async function currentUser(): Promise<CurrentUserResponse> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${API.CMS_API}/auth/me`,
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
  if (!result) {
    throw new AuthException();
  }
  return result as CurrentUserResponse;
}
export async function updateCurrentUserSetting(input: UpdateCurrentUserRequest): Promise<void> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${API.CMS_API}/auth/me/setting`,
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
}
export async function logout(): Promise<void> {
  const refresh_token: string = (await getCurrentUser()).refresh_token;
  const res = await fetch(
    `${API.CMS_API}/auth/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token }),
    },
  );
  handleError(res);
}
export async function getCurrentUserSetting(): Promise<GetCurrentUserResponse> {
  const bearerToken: string = (await getCurrentUser()).access_token;
  const res = await fetch(
    `${API.CMS_API}/auth/me/setting`,
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
  if (!result) {
    throw new AuthException();
  }
  return result as GetCurrentUserResponse;
}