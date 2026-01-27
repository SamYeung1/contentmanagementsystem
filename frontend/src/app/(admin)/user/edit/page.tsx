'use client';
import CmsMain from '@/components/layouts/cms/cms-main';
import { useTranslations } from 'use-intl';
import { BreadcrumbItem } from '@/components/layouts/cms/base/cms-breadcrumb';
import { useActionState, useMemo } from 'react';
import TextField from '@/components/forms/fields/text-field';
import { Button, Card } from 'flowbite-react';
import MultiSelectField from '@/components/forms/fields/multi-select-field';
import { actionCreateUser } from '@/app/(admin)/user/edit/form-action/create';

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
          <MultiSelectField defaultValue={state.initValue?.roles} name={'roles'} serverMode={true} onSearch={(value)=>{
            console.log(value);
          }} options={[
            { value: 'usa', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'fr', label: 'France' },
            { value: 'de', label: 'Germany' },
            { value: 'jp', label: 'Japan' },
          ]} />
          <div className="md:col-span-2">
            <div className={'flex gap-2 justify-end'}>
              <Button color={'red'} outline>{t('Common.button.back')}</Button>
              <Button type={'submit'}>{t('Common.button.submit')}</Button>
            </div>
          </div>
      </form>
    </Card>
  </CmsMain>;
}