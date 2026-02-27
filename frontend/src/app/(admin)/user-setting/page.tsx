import CmsMain from '@/components/layouts/cms/cms-main';
import { Card } from 'flowbite-react';
import { UserSettingForm } from '@/app/(admin)/user-setting/form/user-form';

export default async function UserSettingPage() {
  return <CmsMain>
    <Card>
      <UserSettingForm />
    </Card>
  </CmsMain>;
}