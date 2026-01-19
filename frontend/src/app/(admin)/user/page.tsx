'use client';
import React, { JSX } from 'react';
import { HeadCellItem } from '@/components/data-table/type';
import { UserResponse } from '@/type';
import ServerDataTable from '@/components/data-table/server-data-table';
import { SortableStatus } from '@/components/data-table/data-table';
import { Badge } from 'flowbite-react';
import DropdownManagementMenu, { DropdownManagementMenuPermission } from '@/components/dropdown-management-menu';

const permission:DropdownManagementMenuPermission = {
  canDelete:true,
  canEdit:true
}
const HEADERS: HeadCellItem[] = [
  { label: 'Id', key: 'id' },
  { label: 'Email', key: 'email' },
  { label: 'Name', key: 'name' },
  {
    label: 'Roles', key: 'roles', render: ({ item }: { item: UserResponse }) => {
      const limit = 3;
      if (item.roles.length >= limit) {
        return <span className={'flex flex-wrap gap-2'}>{item.roles.slice(0, limit).map((item,index) => <Badge
          color="info" key={`badge_role_${index}`}>{item.name}</Badge>)}<Badge
          color="info">{item.roles.slice(limit).length}+</Badge></span>;
      } else {
        return <span className={'flex flex-wrap gap-2'}>{item.roles.map((item,index) => <Badge
          color="info" key={`badge_role_${index}`}>{item.name}</Badge>)}</span>;
      }
    }, sortable: false,
  },
  {
    label: '', key: 'action', sortable: false, render: ({ item }: { item: UserResponse }) => {
      return <div className={"flex justify-end"}><DropdownManagementMenu permission={permission} onMenuClicked={(id)=>{
        console.log(id,item);
      }}/></div>;
    },
  },
];

export default function UserPage(): JSX.Element {
  const defaultSort: SortableStatus = {
    key: 'id',
    direction: 'ASC',
  };
  return <ServerDataTable defaultSort={defaultSort} header={HEADERS} url={'/api/user'} />;
}