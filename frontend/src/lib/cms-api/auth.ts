import AuthException from '@/exception/api/auth-exception';

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(input: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  );
  if (res.status === 401) {
    throw new AuthException();
  }
  const user = await res.json();
  if (!user) {
    throw new AuthException();
  }
  return user as LoginResponse;
}

export async function refresh(input: RefreshRequest): Promise<LoginResponse> {
  const res = await fetch(
    `${process.env.CMS_API_BASE_URL}/auth/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  );
  if (res.status === 401) {
    throw new AuthException();
  }
  const user = await res.json();
  if (!user) {
    throw new AuthException();
  }
  return user as LoginResponse;
}