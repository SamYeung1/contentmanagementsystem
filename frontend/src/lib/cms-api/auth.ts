import AuthException from '@/exception/api/auth-exception';
export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  token_type: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export async function login(input: AuthRequest):Promise<AuthResponse>{
    const res = await fetch(
      `${process.env.CMS_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      }
    );
    if(res.status === 401){
      throw new AuthException();
    }
    const user = await res.json();
    if(!user){
      throw new AuthException();
    }
    return user as AuthResponse;
}