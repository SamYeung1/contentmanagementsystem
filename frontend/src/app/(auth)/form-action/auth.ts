'use server';
import { z } from 'zod';
import { login } from '@/lib/auth';
import { UserResponse } from '@/type';
import { setSession } from '@/lib/session';

const schema = z.object({
  email: z.email('Invalid Email').nonempty("Required"),
  password: z.string().nonempty("Required"),
});

export interface LoginSubmitData {
  errors?: any,
  initValue?: {
    password: string;
    email: string;
  }
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
    };
  }
  const user:UserResponse = await login(validatedFields.data?.email!!);
  await setSession<UserResponse>(user);
  return {};
};