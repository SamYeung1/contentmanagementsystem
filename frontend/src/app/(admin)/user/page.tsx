'use client';
import { JSX, useEffect, useMemo, useState } from 'react';
import DataTable, { ServerModePagination, SortableStatus } from '@/components/data-table/data-table';
import { HeadCellItem } from '@/components/data-table/type';
import { UserResponse } from '@/type';
import PageResponse from '@/type/base/page-response';
import { PAGINATION_OPTIONS } from '@/config/setting';

const HEADERS: HeadCellItem[] = [
  { label: 'Id', key: 'id' },
  { label: 'Email', key: 'email' },
  { label: 'Name', key: 'name' },
  {
    label: 'Roles', key: 'roles', render: ({ item }: { item: UserResponse }) => {
      return <label>{item.roles.map((item) => item.name)}</label>;
    },
  },
  {
    label: 'Action', key: 'action', sortable: false, render: ({ item }: { item: UserResponse }) => {
      return <label>{item.id}</label>;
    },
  },
];

function isUserPageResponse(data: any): data is PageResponse<UserResponse> {
  return (
    data &&
    typeof data.total === 'number' &&
    Array.isArray(data.results)
  );
}

export default function UserPage(): JSX.Element {
  const [pageData, setPageData] = useState<PageResponse<UserResponse>>({ total: 0, results: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const serverModePagination: ServerModePagination = useMemo(() => ({
    total: pageData.total,
    isLoading: loading,
    onPageChanged: (currentPage) => {
      setPage(currentPage);
    },
  }), [pageData.total, loading]);
  const limit = PAGINATION_OPTIONS.limit;
  const defaultSort: SortableStatus = {
    key: 'id',
    direction: 'asc',
  };
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/user?page=${page}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((result) => {
        if (isUserPageResponse(result)) {
          setPageData(result);
        } else {
          console.error('Received unexpected data format:', result);
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort(); // Cleanup
  }, [page]);
  return <DataTable data={pageData.results} defaultSort={defaultSort} perPageTotal={limit} header={HEADERS}
                    serverMode={true} serverModePagination={serverModePagination} />;
}