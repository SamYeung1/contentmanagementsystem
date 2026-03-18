import CmsMain from '@/components/layouts/cms/cms-main';
import { Card } from 'flowbite-react';
import { UserSettingForm } from '@/app/(admin)/setting/form/user-form';
import { getCurrentUserSetting } from '@/lib/cms-api/auth';
import { Option } from '@/components/forms/fields/multi-select-field';

export default async function UserSettingPage() {
  const result = await getCurrentUserSetting();
  const roles = result.roles.map((item) => ({
    value: item.id,
    label: item.name
  } as unknown as Option));
  return <CmsMain>
    <Card>
      <UserSettingForm initValue={{
        roles: roles,
        name: result.name,
      }} />
    </Card>
  </CmsMain>;
}