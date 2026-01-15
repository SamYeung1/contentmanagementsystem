import { AuthRequest, AuthResponse } from '@/type/api/auth';
import AuthException from '@/exception/api/auth-exception';

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