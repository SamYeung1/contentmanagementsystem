'use client';
import TextField from '@/components/forms/fields/text-field';
import ServerMultiSelectField from '@/components/forms/fields/server-multi-select-field';
import { Button } from 'flowbite-react';
import { useActionState, useState } from 'react';
import { actionCreateUser, SubmitModel } from '@/app/(admin)/user/edit/form-action/create';
import { useTranslations } from 'use-intl';


interface UserFormProps {
  editMode: boolean;
  initValue?: SubmitModel;
}

export function UserForm({ editMode, initValue }: UserFormProps) {
  const t = useTranslations();
  const [roleIds, setRoleIds] = useState<string[]>(initValue?.roles ? initValue.roles : []);
  const [state, formAction, pending] = useActionState(actionCreateUser, {
    initValue: initValue,
  });
  return <form action={formAction} className="grid gap-4 sm:grid-cols-2 sm:gap-6">
    <TextField defaultValue={state.payload?.get('name') as string}
               errorMessage={state.errors ? state.errors['name']?.join(', ') : null}
               label={t('UserPage.form.name')} name={'name'} />
    <TextField defaultValue={state.payload?.get('email') as string}
               errorMessage={state.errors ? state.errors['email']?.join(', ') : null}
               label={t('UserPage.form.email')} name={'email'} type={'email'} />
    <TextField defaultValue={state.payload?.get('password') as string}
               errorMessage={state.errors ? state.errors['password']?.join(', ') : null}
               label={t('UserPage.form.password')} name={'password'}
               type={'password'} />
    <ServerMultiSelectField label={t('UserPage.form.roles')} onSelected={(options) => {
      setRoleIds(options.map(item => item.value));
    }} errorMessage={state.errors ? state.errors['roles']?.join(', ') : null}
                            textMapper={(item) => ({ value: item.id, label: `${item.id} - ${item.name}` })}
                            url={'/api/user'} />
    <ul className={'hidden'}>{roleIds.map((item) => (<li><input defaultValue={item} name={'roles'} /></li>))}</ul>
    <div className="md:col-span-2">
      <div className={'flex gap-2 justify-end'}>
        <Button color={'red'} outline>{t('Common.button.back')}</Button>
        <Button type={'submit'}>{t('Common.button.submit')}</Button>
      </div>
    </div>
  </form>;
}