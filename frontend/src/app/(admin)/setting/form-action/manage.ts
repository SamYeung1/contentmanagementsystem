'use server';
import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import FormSubmitData from '@/type/base/form-submit-data';
import { handleErrorForm } from '@/lib/util';
import { UpdateCurrentUserRequest, updateCurrentUserSetting } from '@/lib/cms-api/auth';

const t = await getTranslations();
const schemaForEdit = z.object({
  password: z.string().trim().optional(),
  password_confirm: z.string().trim().optional(),
  name: z.string().trim().nonempty(t('Common.error.required')),
  roles: z.array(z.string()).nonempty(t('Common.error.required')),
}).refine((val) => {
    if(val.password){
      return val.password === val.password_confirm;
    }else{
      return true;
    }
  },{
    message: t('Common.error.password_not_match'),
    path: ["password_confirm"],
  }
);

export interface SubmitModel {
  password: string;
  password_confirm:string;
  name: string;
  roles: string[];
}

export const actionUpdateCurrentUserSetting = async (initialState: any, formData: FormData): Promise<FormSubmitData<SubmitModel>> => {
  const validatedFields = schemaForEdit.safeParse({
    password: formData.get('password'),
    password_confirm: formData.get('password_confirm'),
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
  } as UpdateCurrentUserRequest;
  if (validatedFields?.data.password) {
    input.password = validatedFields?.data.password;
  }
  try {
    await updateCurrentUserSetting(input);
    return { serverError: { success: true, message: '' } };
  } catch (error) {
    return handleErrorForm(error, t, formData);
  }
};