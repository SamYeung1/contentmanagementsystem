import CmsMain from '@/components/layouts/cms/cms-main';
import { BreadcrumbItem } from '@/components/layouts/cms/base/cms-breadcrumb';
import { Card } from 'flowbite-react';
import { getTranslations } from 'next-intl/server';
import { UserForm } from '@/app/(admin)/user/form/user-form';

export default async function UserPageCreate() {
  const t = await getTranslations();
  const breadcrumbItems: BreadcrumbItem[] = [
    { text: t('DashboardPage.page_title'), href: '/dashboard' },
    { text: t('UserPage.page_title'), href: '/user' },
    { text: t('UserPage.page_title_create') },
  ];
  return <CmsMain breadcrumbItems={breadcrumbItems}>
    <Card>
      <UserForm editMode={false} />
    </Card>
  </CmsMain>;
}