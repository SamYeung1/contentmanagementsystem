'use client';
import TextField from '@/components/forms/fields/text-field';
import ServerMultiSelectField from '@/components/forms/fields/server-multi-select-field';
import { Button } from 'flowbite-react';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/navigation';
import { LoadingModel } from '@/components/modal/loading-modal';
import { Option } from '@/components/forms/fields/multi-select-field';
import { useAlert } from '@/context/alert-context';
import { actionUpdateCurrentUserSetting, SubmitModel } from '@/app/(admin)/setting/form-action/manage';

interface SubmitModelEdit extends Omit<SubmitModel, 'roles' | 'password' | 'password_confirm'> {
  roles: Option[];
}
interface UserSettingFormProps {
  initValue?: SubmitModelEdit;
}

export function UserSettingForm({initValue }: UserSettingFormProps) {
  const t = useTranslations();
  const alert = useAlert();
  const initialRoleIds = useMemo(() =>
      initValue?.roles?.map(r => r.value) || [],
    [initValue],
  );
  const [roleIds, setRoleIds] = useState(initialRoleIds);
  const [state, formAction, pending] = useActionState(actionUpdateCurrentUserSetting, {
    initValue: {
      roles: initialRoleIds,
      name: initValue?.name,
      password: '',
    } as SubmitModel,
  });
  const router = useRouter();
  useEffect(() => {
    if (state?.serverError?.success === true) {
      router.back();
    } else if (state?.serverError?.success === false) {
      alert?.showError(state?.serverError?.message);
    }
  }, [state, router, alert]);
  return <>
    <LoadingModel show={pending} />
    <form action={formAction} className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <TextField required defaultValue={state.payload?.get('name') as string || initValue?.name}
                 errorMessage={state.errors ? state.errors['name']?.join(', ') : null}
                 label={t('UserSettingPage.form.name')} name={'name'} />
      <ServerMultiSelectField required dependOnQuery={true} label={t('UserSettingPage.form.roles')} defaultValue={initValue?.roles}
                              onSelected={(options) => {
                                const newIds = options.map(item => item.value);
                                setRoleIds(prev => {
                                  const isSame = prev.length === newIds.length &&
                                    prev.every((val, i) => val === newIds[i]);
                                  return isSame ? prev : newIds;
                                });
                              }} errorMessage={state.errors ? state.errors['roles']?.join(', ') : null}
                              textMapper={(item) => ({ value: item.id, label: `${item.id} - ${item.name}` })}
                              url={'/api/role'} />
      <TextField
        errorMessage={state.errors ? state.errors['password']?.join(', ') : null}
        label={t('UserSettingPage.form.password')} name={'password'}
        type={'password'} />
      <TextField
        errorMessage={state.errors ? state.errors['password_confirm']?.join(', ') : null}
        label={t('UserSettingPage.form.password_confirm')} name={'password_confirm'}
        type={'password'} />
      <ul className={'hidden'}>{roleIds.map((item, index) => (
        <li key={`li-input-roles-${index}`}><input defaultValue={item} name={'roles'} /></li>))}</ul>
      <div className="md:col-span-2">
        <div className={'flex gap-2 justify-end'}>
          <Button type={'submit'}>{t('Common.button.submit')}</Button>
        </div>
      </div>
    </form>
  </>;
}