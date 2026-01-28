'use client';
import TextField from '@/components/forms/fields/text-field';
import ServerMultiSelectField from '@/components/forms/fields/server-multi-select-field';
import { Button } from 'flowbite-react';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { actionCreateUser,actionEditUser, SubmitModel } from '@/app/(admin)/user/edit/form-action/manage';
import { useTranslations } from 'use-intl';
import { AlertModal } from '@/components/modal/alert-modal';
import { useRouter } from 'next/navigation';
import { LoadingModel } from '@/components/modal/loading-modal';
import { Option } from '@/components/forms/fields/multi-select-field';

interface SubmitModelEdit extends Omit<SubmitModel, 'roles' | 'password'> {
  roles: Option[];
}

interface UserFormProps {
  editMode: boolean;
  initValue?: SubmitModelEdit;
}

export function UserForm({ editMode, initValue }: UserFormProps) {
  const t = useTranslations();
  const initialRoleIds = useMemo(() =>
      initValue?.roles?.map(r => r.value) || [],
    [initValue],
  );
  const [roleIds, setRoleIds] = useState<string[]>(initialRoleIds);
  const [state, formAction, pending] = useActionState(editMode ? actionEditUser : actionCreateUser, {
    initValue: {
      id:initValue?.id,
      email: initValue?.email,
      roles: initialRoleIds,
      name: initValue?.name,
      password: '',
    } as SubmitModel,
  });
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (state?.serverError?.success === true) {
      router.back();
    }
  }, [state?.serverError?.success, router]);
  return <>
    <AlertModal message={t('Common.modal.back_confirm_message')}
                buttonLeftText={t('Common.button.confirm_sure')}
                buttonRightText={t('Common.button.cancel_sure')}
                icon={'circle-alert'} show={openConfirmModal}
                onLeftClicked={() => {
                  router.back();
                  setOpenConfirmModal(false);
                }}
                onRightClicked={() => {
                  setOpenConfirmModal(false);
                }} />
    <LoadingModel show={pending} />
    <form action={formAction} className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      {editMode && (<input type={'hidden'} value={initValue?.id} name={'id'}/>)}
      <TextField required defaultValue={state.payload?.get('name') as string || initValue?.name}
                 errorMessage={state.errors ? state.errors['name']?.join(', ') : null}
                 label={t('UserPage.form.name')} name={'name'} />
      <TextField disabled={editMode} required defaultValue={state.payload?.get('email') as string || initValue?.email}
                 errorMessage={state.errors ? state.errors['email']?.join(', ') : null}
                 label={t('UserPage.form.email')} name={'email'} type={'email'} />
      <TextField required={!editMode} defaultValue={state.payload?.get('password') as string}
                 errorMessage={state.errors ? state.errors['password']?.join(', ') : null}
                 label={t('UserPage.form.password')} name={'password'}
                 type={'password'} />
      <ServerMultiSelectField dependOnQuery={true} label={t('UserPage.form.roles')} defaultValue={initValue?.roles}
                              onSelected={(options) => {
                                const ids = options.map(item => item.value);
                                setRoleIds(ids);
                              }} errorMessage={state.errors ? state.errors['roles']?.join(', ') : null}
                              textMapper={(item) => ({ value: item.id, label: `${item.id} - ${item.name}` })}
                              url={'/api/role'} />
      <ul className={'hidden'}>{roleIds.map((item, index) => (
        <li key={`li-input-roles-${index}`}><input defaultValue={item} name={'roles'} /></li>))}</ul>
      <div className="md:col-span-2">
        <div className={'flex gap-2 justify-end'}>
          <Button color={'red'} outline onClick={() => {
            setOpenConfirmModal(true);
          }}>{t('Common.button.back')}</Button>
          <Button type={'submit'}>{t('Common.button.submit')}</Button>
        </div>
      </div>
    </form>
  </>;
}