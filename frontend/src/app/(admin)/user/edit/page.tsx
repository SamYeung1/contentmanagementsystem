'use client';
import CmsMain from '@/components/layouts/cms/cms-main';
import { useTranslations } from 'use-intl';
import { BreadcrumbItem } from '@/components/layouts/cms/base/cms-breadcrumb';
import { useActionState, useMemo } from 'react';
import TextField from '@/components/forms/fields/text-field';
import { Button, Card } from 'flowbite-react';
import { actionCreateUser } from '@/app/(admin)/user/edit/form-action/create';
import ServerMultiSelectField from '@/components/forms/fields/server-multi-select-field';

export default function UserPageCreate() {
  const t = useTranslations();
  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => [
    { text: t('DashboardPage.page_title'), href: '/dashboard' },
    { text: t('UserPage.page_title'), href: '/user' },
    { text: t('UserPage.page_title_create') },
  ], [t]);
  const [state, formAction, pending] = useActionState(actionCreateUser, {
    // initValue:{
    //   roles:['usa','ca']
    // }
  });
  return <CmsMain breadcrumbItems={breadcrumbItems}>
    <Card>
      <form action={formAction} className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextField label={t('UserPage.form.name')} name={'name'} />
        <TextField label={t('UserPage.form.email')} name={'email'} type={'email'} />
        <TextField label={t('UserPage.form.password')} name={'password'} type={'password'} />
        <ServerMultiSelectField textMapper={(item)=>({value:item.id,label:`${item.id} - ${item.name}`})} defaultValue={state.initValue?.roles} name={'roles'} url={'/api/user'}/>
        <div className="md:col-span-2">
          <div className={'flex gap-2 justify-end'}>
            <Button color={'red'} outline>{t('Common.button.back')}</Button>
            <Button type={'submit'}>{t('Common.button.submit')}</Button>
          </div>
        </div>
      </form>
    </Card>;
  </CmsMain>
    ;
}