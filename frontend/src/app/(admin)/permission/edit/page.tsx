import CmsMain from '@/components/layouts/cms/cms-main';
import { BreadcrumbItem } from '@/components/layouts/cms/base/cms-breadcrumb';
import { Card } from 'flowbite-react';
import { getTranslations } from 'next-intl/server';
import { PermissionForm } from '@/app/(admin)/permission/form/permission-form';

export default async function PermissionPageCreate() {
  const t = await getTranslations();
  const breadcrumbItems: BreadcrumbItem[] = [
    { text: t('DashboardPage.page_title'), href: '/dashboard' },
    { text: t('PermissionPage.page_title'), href: '/permission' },
    { text: t('PermissionPage.page_title_create') },
  ];
  return <CmsMain breadcrumbItems={breadcrumbItems}>
    <Card>
      <PermissionForm editMode={false} />
    </Card>
  </CmsMain>;
}