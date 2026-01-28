'use client';
import React, { JSX, useEffect, useMemo, useState } from 'react';
import { HeadCellItem } from '@/components/data-table/type';
import { UserResponse } from '@/type/cms';
import ServerDataTable from '@/components/data-table/server-data-table';
import { SortableStatus } from '@/components/data-table/data-table';
import { Badge } from 'flowbite-react';
import DropdownManagementMenu, { DropdownManagementMenuPermission } from '@/components/dropdown-management-menu';
import { BreadcrumbItem, CmsBreadcrumb } from '@/components/layouts/cms/base/cms-breadcrumb';
import DataTableHeader from '@/components/data-table/data-table-header';
import { useCurrentUser } from '@/context/current-user-context';
import { checkPermission } from '@/lib/util';
import { useTranslations } from 'use-intl';
import CmsMain from '@/components/layouts/cms/cms-main';
import { useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modal/alert-modal';

const PAGE_NAME = 'user';
const DEFAULT_SORT: SortableStatus = {
  key: 'id',
  direction: 'ASC',
};

export default function UserPage(): JSX.Element {
  const t = useTranslations();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => [
    { text: t('DashboardPage.page_title'), href: '/dashboard' },
    { text: t('UserPage.page_title') },
  ], [t]);
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
                  if (actionId === '1') {
                    router.push(`/user/edit/${item.id}`);
                  } else if (actionId === '-1') {
                    setDeleteList([item.id.toString()]);
                    setOpenConfirmModal(true);
                  }
                }}
              />}
            </div>
          );
        },
      },
    ];
  }, [user, t, router]);
  const [queryParams, setQueryParams] = useState({});
  const handleSearch = (text: string) => {
    setQueryParams(prev => ({ ...prev, search: text }));
  };
  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setQueryParams((prev) => ({ ...prev, _refresh: Date.now() }));
      } else {
        console.error('Failed to delete');
      }
    } catch (error) {
      console.error('Network error', error);
    } finally {
      setDeleteList([]);
      setIsDeleting(false);

    }
  };

  return <CmsMain breadcrumbItems={breadcrumbItems}>
    <AlertModal message={t('Common.modal.delete_confirm_message')}
                buttonLeftText={t('Common.button.confirm_sure')}
                buttonRightText={t('Common.button.cancel_sure')}
                icon={'circle-alert'} show={openConfirmModal}
                onClosed={()=>{
                  setDeleteList([]);
                }}
                onLeftClicked={async () => {
                  setOpenConfirmModal(false);
                  await handleDelete(deleteList[0]);
                }}
                onRightClicked={() => {
                  setDeleteList([]);
                  setOpenConfirmModal(false);
                }} />
    <DataTableHeader addButton={{
      title: t('UserPage.button_add_user'),
      onClick: () => router.push('/user/edit'),
      permission: { canAdd: checkPermission(user, 'CREATE', PAGE_NAME) },
    }} onSearch={handleSearch} />
    <ServerDataTable defaultSort={DEFAULT_SORT} header={headers} url={'/api/user'} query={queryParams} />
  </CmsMain>;
}