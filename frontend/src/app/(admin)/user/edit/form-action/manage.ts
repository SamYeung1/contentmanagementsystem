'use server';
import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import FormSubmitData from '@/type/base/form-submit-data';
import { createUser, editUser, UserEditRequest } from '@/lib/cms-api/user';
import { handleErrorForm } from '@/lib/util';

const t = await getTranslations();
const schema = z.object({
  email: z.email(t('Common.error.invalid_email').trim()).nonempty(t('Common.error.required')),
  password: z.string().trim().nonempty(t('Common.error.required')),
  name: z.string().trim().nonempty(t('Common.error.required')),
  roles: z.array(z.string()).nonempty(t('Common.error.required')),
});
const schemaForEdit = z.object({
  id: z.string().nonempty(t('Common.error.required')),
  password: z.string().trim().optional(),
  name: z.string().trim().nonempty(t('Common.error.required')),
  roles: z.array(z.string()).nonempty(t('Common.error.required')),
});

export interface SubmitModel {
  id?: string;
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
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      payload: formData,
    };
  }
  try {
    await createUser({
      email: validatedFields.data?.email,
      password: validatedFields.data?.password,
      name: validatedFields.data?.name,
      roles: validatedFields.data.roles,
    });
    return { serverError: { success: true, message: '' } };
  } catch (error) {
    return handleErrorForm(error, t, formData);
  }
};
export const actionEditUser = async (initialState: any, formData: FormData): Promise<FormSubmitData<SubmitModel>> => {
  const validatedFields = schemaForEdit.safeParse({
    id: formData.get('id'),
    password: formData.get('password'),
    name: formData.get('name'),
    roles: formData.getAll('roles'),
  });
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      payload: formData,
    };
  }
  const input = {
    name: validatedFields?.data.name,
    roles: validatedFields?.data.roles,
  } as UserEditRequest;
  if (validatedFields?.data.password) {
    input.password = validatedFields?.data.password;
  }
  try {
    await editUser(validatedFields.data.id, input);
    return { serverError: { success: true, message: '' } };
  } catch (error) {
    return handleErrorForm(error, t, formData);
  }
};