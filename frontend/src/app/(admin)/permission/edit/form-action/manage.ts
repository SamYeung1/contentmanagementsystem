'use server';
import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import FormSubmitData from '@/type/base/form-submit-data';
import { createPermission, editPermission, PermissionEditRequest } from '@/lib/cms-api/permission';
import { handleErrorForm } from '@/lib/util';

const t = await getTranslations();
const schema = z.object({
  action: z.string().trim().nonempty(t('Common.error.required')),
  resource: z.string().trim().nonempty(t('Common.error.required')),
  name: z.string().trim().nonempty(t('Common.error.required')),
});
const schemaForEdit = z.object({
  id: z.string().nonempty(t('Common.error.required')),
  resource: z.string().trim().nonempty(t('Common.error.required')),
  action: z.string().trim().nonempty(t('Common.error.required')),
  name: z.string().trim().nonempty(t('Common.error.required')),
});

export interface SubmitModel {
  id?: string;
  action: string;
  resource:string;
  name: string;
}

export const actionCreatePermission = async (initialState: any, formData: FormData): Promise<FormSubmitData<SubmitModel>> => {
  const validatedFields = schema.safeParse({
    action: formData.get('action'),
    resource: formData.get('resource'),
    name: formData.get('name'),
  });
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      payload: formData,
    };
  }
  try {
    await createPermission({
      name: validatedFields.data.name,
      action: `${validatedFields.data.action}@${validatedFields.data.resource}`,
    });
    return { serverError: { success: true, message: '' } };
  } catch (error) {
    return handleErrorForm(error, t, formData);
  }
};
export const actionEditPermission = async (initialState: any, formData: FormData): Promise<FormSubmitData<SubmitModel>> => {
  const validatedFields = schemaForEdit.safeParse({
    id: formData.get('id'),
    resource: formData.get('resource'),
    action: formData.get('action'),
    name: formData.get('name'),
  });
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      payload: formData,
    };
  }
  const input = {
    name: validatedFields?.data.name,
    action: `${validatedFields.data.action}@${validatedFields.data.resource}`,
  } as PermissionEditRequest;
  try {
    await editPermission(validatedFields.data.id, input);
    return { serverError: { success: true, message: '' } };
  } catch (error) {
    return handleErrorForm(error, t, formData);
  }
};