'use client';
import { useEffect, useMemo, useState } from 'react';
import PageResponse from '@/type/base/page-response';
import { UserResponse } from '@/type';
import DataTable, { ServerModePagination, SortableStatus } from '@/components/data-table/data-table';
import { PAGINATION_OPTIONS } from '@/config/setting';
import { HeadCellItem } from '@/components/data-table/type';

function isPageResponse(data: any): data is PageResponse<any> {
  return (
    data &&
    typeof data.total === 'number' &&
    Array.isArray(data.results)
  );
}

interface ServerDataTableProps {
  header: HeadCellItem[];
  defaultSort: SortableStatus;
  url: string;
}

export default function ServerDataTable({ header, defaultSort, url }: ServerDataTableProps) {
  const [pageData, setPageData] = useState<PageResponse<UserResponse>>({ total: 0, results: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [sortableStatus, setSortableStatus] = useState(defaultSort);
  const serverModePagination: ServerModePagination = useMemo(() => ({
    total: pageData.total,
    isLoading: loading,
    onPageChanged: (currentPage) => {
      setPage(currentPage);
    },
    onSortClicked: (sortableStatus) => {
      setSortableStatus(sortableStatus);
    },
  }), [pageData.total, loading]);
  const limit = PAGINATION_OPTIONS.limit;
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(`${url}?page=${page}&orderBy=${JSON.stringify(sortableStatus)}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((result) => {
        if (isPageResponse(result)) {
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
    return () => controller.abort();
  }, [page,sortableStatus]);
  return <DataTable data={pageData.results} defaultSort={defaultSort} perPageTotal={limit} header={header}
                    serverMode={true} serverModePagination={serverModePagination} />;
}