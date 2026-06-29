import { BreadcrumbItem } from '@/components/layouts/cms/base/cms-breadcrumb';
import CmsMain from '@/components/layouts/cms/cms-main';
import { PermissionForm } from '@/app/(admin)/permission/form/permission-form';
import { getTranslations } from 'next-intl/server';
import { getPermission } from '@/lib/cms-api/permission';

export default async function PermissionPageEdit({ params }: PageProps<'/permission/edit/[id]'>) {
  const { id } = await params;
  const t = await getTranslations();
  const breadcrumbItems: BreadcrumbItem[] = [
    { text: t('DashboardPage.page_title'), href: '/dashboard' },
    { text: t('PermissionPage.page_title'), href: '/permission' },
    { text: t('PermissionPage.page_title_edit') },
  ];
  const result = await getPermission(id);
  let [action,resource] = result.action.split('@');
  return <CmsMain breadcrumbItems={breadcrumbItems}>
    <PermissionForm editMode={true} initValue={{
      id:result.id.toString(),
      name: result.name,
      action: action,
      resource: resource
    }} />
  </CmsMain>;
}