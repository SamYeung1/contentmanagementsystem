'use client';
import React, { JSX, useMemo, useState } from 'react';
import { HeadCellItem } from '@/components/data-table/type';
import { UserResponse } from '@/type/cms';
import ServerDataTable from '@/components/data-table/server-data-table';
import { SortableStatus } from '@/components/data-table/data-table';
import { Badge } from 'flowbite-react';
import DropdownManagementMenu, { DropdownManagementMenuPermission } from '@/components/dropdown-management-menu';
import { BreadcrumbItem, CmsBreadcrumb } from '@/components/layouts/cms/cms-breadcrumb';
import DataTableHeader from '@/components/data-table/data-table-header';
import { useCurrentUser } from '@/context/current-user-context';
import { checkPermission } from '@/lib/util';

const PAGE_NAME = 'user';
const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { text: 'page_title_dashboard', href: '/dashboard' },
  { text: 'page_title_user_management' },
];
const DEFAULT_SORT: SortableStatus = {
  key: 'id',
  direction: 'ASC',
};

export default function UserPage(): JSX.Element {
  const { user } = useCurrentUser();
  const headers: HeadCellItem[] = useMemo(() => {
    const rowPermissions: DropdownManagementMenuPermission = {
      canDelete: checkPermission(user, 'DELETE', PAGE_NAME),
      canEdit: checkPermission(user, 'UPDATE', PAGE_NAME),
    };
    const hasAccess = Object.values(rowPermissions).some((allowed) => allowed);
    return [
      { label: 'Id', key: 'id' },
      { label: 'Email', key: 'email' },
      { label: 'Name', key: 'name' },
      {
        label: 'Roles',
        key: 'roles',
        sortable: false,
        render: ({ item }: { item: UserResponse }) => {
          const limit = 3;
          const visibleRoles = item.roles.slice(0, limit);
          const hiddenCount = item.roles.length - limit;
          return (
            <span className="flex flex-wrap gap-2">
            {visibleRoles.map((role, index) => (
              <Badge color="info" key={`badge_role_${index}`}>
                {role.name}
              </Badge>
            ))}
              {hiddenCount > 0 && (
                <Badge color="info">
                  {hiddenCount}+
                </Badge>
              )}
          </span>
          );
        },
      },
      {
        label: '',
        key: 'action',
        sortable: false,
        hidden: !hasAccess,
        render: ({ item }: { item: UserResponse }) => {
          return (
            <div className="flex justify-end">
              {<DropdownManagementMenu
                permission={rowPermissions}
                onMenuClicked={(actionId) => {
                  console.log(`Action: ${actionId} on user: ${item.id}`);
                }}
              />}
            </div>
          );
        },
      },
    ];
  }, [user]);
  const [queryParams, setQueryParams] = useState({});
  const handleSearch = (text: string) => {
    setQueryParams(prev => ({ ...prev, search: text }));
  };

  return <div className={'flex flex-col gap-2'}>
    <CmsBreadcrumb items={BREADCRUMB_ITEMS} />
    <DataTableHeader addButton={{
      title: 'button_add_user',
      permission: { canAdd: checkPermission(user, 'CREATE', PAGE_NAME) },
    }} onSearch={handleSearch} />
    <ServerDataTable defaultSort={DEFAULT_SORT} header={headers} url={'/api/user'} query={queryParams} />
  </div>;
}