import { Delete, Edit, EllipsisVertical } from 'lucide-react';
import { Dropdown, DropdownItem } from 'flowbite-react';
import React from 'react';
import { useTranslations } from 'use-intl';

export interface DropdownManagementMenuPermission{
  canDelete: boolean;
  canEdit: boolean;
}
interface DropdownManagementMenuProps {
  onMenuClicked: (id: string) => void;
  permission?:DropdownManagementMenuPermission
}

export default function DropdownManagementMenu({ onMenuClicked,permission }: DropdownManagementMenuProps) {
  const t = useTranslations('DropdownManagementMenu');
  return <Dropdown
    arrowIcon={false}
    inline

    label={
      <EllipsisVertical className={'cursor-pointer'} size={18} />
    }
  >
    {permission?.canEdit && <DropdownItem icon={Edit} onClick={() => {
      onMenuClicked('1');
    }}>{t('edit')}</DropdownItem>}
    {permission?.canDelete &&<DropdownItem icon={Delete}  className={'text-danger'} onClick={() => {
      onMenuClicked('-1');
    }}>{t('delete')}</DropdownItem>}
  </Dropdown>;
}