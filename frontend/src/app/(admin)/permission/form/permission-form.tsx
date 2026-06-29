'use client';
import TextField from '@/components/forms/fields/text-field';
import { Button } from 'flowbite-react';
import { useActionState, useEffect} from 'react';
import { actionCreatePermission, actionEditPermission, SubmitModel } from '@/app/(admin)/permission/edit/form-action/manage';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/navigation';
import { LoadingModel } from '@/components/modal/loading-modal';
import { useAlert } from '@/context/alert-context';
import SelectField from '@/components/forms/fields/select-field';
import {ACTION_SELECT_OPTIONS} from '@/config/constants';

interface SubmitModelEdit extends SubmitModel {
}

interface PermissionFormProps {
  editMode: boolean;
  initValue?: SubmitModelEdit;
}

export function PermissionForm({ editMode, initValue }: PermissionFormProps) {
  const t = useTranslations();
  const alert = useAlert();
  const [state, formAction, pending] = useActionState(editMode ? actionEditPermission : actionCreatePermission, {
    initValue: {
      name: initValue?.name,
      action: initValue?.action,
      resource: initValue?.resource,
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
      {editMode && (<input type={'hidden'} value={initValue?.id} name={'id'} />)}
      <TextField required defaultValue={state.payload?.get('name') as string || initValue?.name}
                 errorMessage={state.errors ? state.errors['name']?.join(', ') : null}
                 label={t('PermissionPage.form.name')} name={'name'} />
      <SelectField options={ACTION_SELECT_OPTIONS} required defaultValue={state.payload?.get('action') as string || initValue?.action}
                 errorMessage={state.errors ? state.errors['action']?.join(', ') : null}
                 label={t('PermissionPage.form.action')} name={'action'}/>
      <TextField required defaultValue={state.payload?.get('resource') as string || initValue?.resource}
                 errorMessage={state.errors ? state.errors['resource']?.join(', ') : null}
                 label={t('PermissionPage.form.resource')} name={'resource'}/>
      <div className="md:col-span-2">
        <div className={'flex gap-2 justify-end'}>
          <Button color={'red'} outline onClick={() => {
            alert?.showConfirm(t('Common.modal.back_confirm_message'), () => {
              router.back();
            });
          }}>{t('Common.button.back')}</Button>
          <Button type={'submit'}>{t('Common.button.submit')}</Button>
        </div>
      </div>
    </form>
  </>;
}