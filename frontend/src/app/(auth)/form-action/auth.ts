'use server';
import { z } from 'zod';
import { login, LoginResponse } from '@/lib/cms-api/auth';
import AuthException from '@/exception/api/auth-exception';
import { getTranslations } from 'next-intl/server';
import { storeSession } from '@/lib/user-session';
import FormSubmitData from '@/type/base/form-submit-data';

const t = await getTranslations();

const schema = z.object({
  email: z.email(t('Common.error.invalid_email')).nonempty(t('Common.error.required')),
  password: z.string().nonempty(t('Common.error.required')),
});

export interface SubmitModel{
  password: string;
  email: string;
}

export const actionLogin = async (initialState: any, formData: FormData): Promise<FormSubmitData<SubmitModel>> => {
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
    const auth: LoginResponse = await login({
      email: validatedFields.data?.email,
      password: validatedFields.data?.password,
    });
    await storeSession<LoginResponse>(auth);
    return { serverError: { success: true, message: '' } };
  } catch (error) {
    if (error instanceof AuthException) {
      return { serverError: { success: false, message: t('auth_error') } };
    }
    console.error(error);
  }
  return { serverError: { success: false, message: '' } };
};