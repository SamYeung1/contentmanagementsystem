import { BreadcrumbItem } from '@/components/layouts/cms/base/cms-breadcrumb';
import CmsMain from '@/components/layouts/cms/cms-main';
import { UserForm } from '@/app/(admin)/user/form/user-form';
import { getTranslations } from 'next-intl/server';
import { get } from '@/lib/cms-api/user';
import { Option } from '@/components/forms/fields/multi-select-field';

export default async function UserPageEdit({ params }: PageProps<'/user/edit/[id]'>) {
  const { id } = await params;
  const t = await getTranslations();
  const breadcrumbItems: BreadcrumbItem[] = [
    { text: t('DashboardPage.page_title'), href: '/dashboard' },
    { text: t('UserPage.page_title'), href: '/user' },
    { text: t('UserPage.page_title_edit') },
  ];
  const result = await get(id);
  const roles = result.roles.map((item) => ({
    value: item.id,
    label: item.name
  } as unknown as Option));
  return <CmsMain breadcrumbItems={breadcrumbItems}>
    <UserForm editMode={true} initValue={{
      id:result.id.toString(),
      email: result.email,
      roles: roles,
      name: result.name,
    }} />
  </CmsMain>;
}