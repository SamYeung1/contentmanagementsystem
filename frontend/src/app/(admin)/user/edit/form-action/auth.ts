'use server';
import { z } from 'zod';
import { login, LoginResponse } from '@/lib/cms-api/auth';
import AuthException from '@/exception/api/auth-exception';
import { getTranslations } from 'next-intl/server';
import { storeSession } from '@/lib/user-session';

const schema = z.object({
  email: z.email('Invalid Email').nonempty('Required'),
  password: z.string().nonempty('Required'),
});
const t = await getTranslations('LoginPage');

export interface CreateUserData {
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

export const actionCreateUser = async (initialState: any, formData: FormData): Promise<CreateUserData> => {
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
    //TODO create user
    return { serverError: { success: true, message: '' } };
  } catch (error) {
    if (error instanceof AuthException) {
      return { serverError: { success: false, message: t('auth_error') } };
    }
    console.error(error);
  }
  return { serverError: { success: false, message: '' } };
};