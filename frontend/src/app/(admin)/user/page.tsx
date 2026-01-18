"use client"
import { JSX} from 'react';
import { HeadCellItem } from '@/components/data-table/type';
import { UserResponse } from '@/type';
import ServerDataTable from '@/components/data-table/server-data-table';
import { SortableStatus } from '@/components/data-table/data-table';

const HEADERS: HeadCellItem[] = [
  { label: 'Id', key: 'id' },
  { label: 'Email', key: 'email' },
  { label: 'Name', key: 'name' },
  {
    label: 'Roles', key: 'roles', render: ({ item }: { item: UserResponse }) => {
      return <label>{item.roles.map((item) => item.name)}</label>;
    },sortable:false
  },
  {
    label: 'Action', key: 'action', sortable: false, render: ({ item }: { item: UserResponse }) => {
      return <label>{item.id}</label>;
    },
  },
];

export default function UserPage(): JSX.Element {
  const defaultSort: SortableStatus = {
    key: 'id',
    direction: 'ASC',
  };
  return <ServerDataTable defaultSort={defaultSort} header={HEADERS} url={'/api/user'}/>;
}