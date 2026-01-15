'use server';
import { z } from 'zod';
import { login } from '@/lib/cms-api/auth';
import { setSession } from '@/lib/session';
import { UserSession } from '@/type/user-session';
import AuthException from '@/exception/api/auth-exception';

const schema = z.object({
  email: z.email('Invalid Email').nonempty('Required'),
  password: z.string().nonempty('Required'),
});

export interface LoginSubmitData {
  errors?: any,
  initValue?: {
    password: string;
    email: string;
  }
  serverError?: {
    success: boolean,
    message: string
  },
}

export const actionLogin = async (initialState: any, formData: FormData): Promise<LoginSubmitData> => {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      serverError: { success: false, message: '' },
    };
  }
  try {
    const user: any = await login({ email: validatedFields.data?.email, password: validatedFields.data?.password });
    console.log(user);
    // await setSession<UserSession>({token:user});
    return { serverError: { success: true, message: '' } };
  } catch (error) {
    if (error instanceof AuthException) {
      return { serverError: { success: false, message: error.message } };
    }
    console.error(error);
  }
  return { serverError: { success: false, message: '' } };
};