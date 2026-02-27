import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import { Button, ButtonGroup, Dropdown, DropdownItem } from 'flowbite-react';
import React from 'react';
import { useTranslations } from 'use-intl';

export interface DropdownManagementMenuPermission {
  canDelete: boolean;
  canEdit: boolean;
}

interface DropdownManagementMenuProps {
  onMenuClicked: (id: string) => void;
  permission?: DropdownManagementMenuPermission;
}

export default function DropdownManagementMenu({ onMenuClicked, permission }: DropdownManagementMenuProps) {
  const t = useTranslations('DropdownManagementMenu');
  return <div>
    <div className={'block md:hidden'}>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <EllipsisVertical className={'cursor-pointer'} size={18} />
        }
      >
        {permission?.canEdit && <DropdownItem icon={Edit} onClick={() => {
          onMenuClicked('1');
        }}>{t('edit')}</DropdownItem>}
        {permission?.canDelete && <DropdownItem icon={Trash} className={'text-danger'} onClick={() => {
          onMenuClicked('-1');
        }}>{t('delete')}</DropdownItem>}
      </Dropdown>
    </div>
    <div className={'hidden md:block'}>
      <ButtonGroup>
        <Button onClick={()=>onMenuClicked('-1')} outline color={'red'} size={'sm'}><Trash className={'h-4 w-4'}/></Button>
        <Button onClick={()=>onMenuClicked('1')} size={'sm'}><Edit className={'h-4 w-4'}/></Button>
      </ButtonGroup>
    </div>
  </div>;
}