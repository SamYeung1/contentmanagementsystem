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
  const auth = await res.json();

  if (!auth) {
    throw new AuthException();
  }
  const bufferTime = 2 * 60 // 2 mins
  auth.expires_in = Date.now() + ((auth.expires_in - bufferTime) * 1000);
  return auth as LoginResponse;
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
  const auth = await res.json();
  if (!auth) {
    throw new AuthException();
  }
  const bufferTime = 2 * 60 // 2 mins
  auth.expires_in = Date.now() + ((auth.expires_in - bufferTime) * 1000);
  return auth as LoginResponse;
}