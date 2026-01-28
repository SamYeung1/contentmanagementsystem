'use server';
import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import AuthException from '@/exception/api/auth-exception';
import FormSubmitData from '@/type/base/form-submit-data';

const t = await getTranslations();
const schema = z.object({
  email: z.email(t('Common.error.invalid_email')).nonempty(t('Common.error.required')),
  password: z.string().nonempty(t('Common.error.required')),
  name: z.string().nonempty(t('Common.error.required')),
  roles: z.array(z.string()).nonempty(t('Common.error.required')),
});

export interface SubmitModel {
  password: string;
  email: string;
  name: string;
  roles: string[];
}

export const actionCreateUser = async (initialState: any, formData: FormData): Promise<FormSubmitData<SubmitModel>> => {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    roles: formData.getAll('roles'),
  });
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      serverError: { success: false, message: '' },
      payload: formData,
    };
  }
  try {
    //TODO create user
    console.log(validatedFields.data);
    return { serverError: { success: true, message: '' } };
  } catch (error) {
    if (error instanceof AuthException) {
      return { serverError: { success: false, message: t('auth_error') }, payload: formData };
    }
    console.error(error);
  }
  return { serverError: { success: false, message: '' }, payload: formData };
};