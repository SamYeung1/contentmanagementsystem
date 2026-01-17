'use client';
import {
  Table,
  Pagination,
  TableHeadCell,
  TableHead,
  TableBody,
  TableRow,
  TableCell, Spinner,
} from 'flowbite-react';
import { useState, useMemo, JSX, memo, useRef, useCallback } from 'react';
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon } from 'lucide-react';
import { CustomFlowbiteTheme } from 'flowbite-react/types';
import { HeadCellItem } from '@/components/data-table/type';

interface SortIconProps {
  direction: string | null;
}

interface DataTableProps {
  data: Record<string, any>[];
  header: HeadCellItem[];
  identifyKey: string;
  defaultSortKey: string;
  perPageTotal: number;
  serverMode?: boolean;
}

interface SortableHeadCellProps {
  label: string;
  sortKey: string;
  sortable: boolean;
  onSort: (key: string) => void;
  direction: string | null;
  isActive: boolean;
}

interface SortableStatus {
  key: string;
  direction: string;
}

const SortIcon = ({ direction }: SortIconProps) => {
  const size = 16;
  if (!direction) return (
    <ChevronsUpDownIcon size={size} />
  );
  return direction === 'asc' ? (
    <ChevronUpIcon size={size} />
  ) : (
    <ChevronDownIcon size={size} />
  );
};
const SortableHeadCell = memo(({
                                 label,
                                 sortKey,
                                 sortable,
                                 onSort,
                                 isActive,
                                 direction,
                               }: SortableHeadCellProps): JSX.Element => {
  const className = 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 select-none group';
  return sortable ? <TableHeadCell
    onClick={() => sortable && onSort(sortKey)}
    className={className}
  >
    <div className="flex items-center">
      {label}
      {sortable && <SortIcon direction={isActive ? direction : null} />}
    </div>
  </TableHeadCell> : <TableHeadCell className={className}>
    <div className="flex items-center">
      {label}
    </div>
  </TableHeadCell>;
});
const paginationTheme: CustomFlowbiteTheme['pagination'] = {
  pages: {
    selector: {
      base: 'w-8 cursor-pointer',
    },
    previous: {
      base: 'cursor-pointer',
    },
    next: {
      base: 'cursor-pointer',
    },
  },
};
export default function DataTable({
                                    data,
                                    defaultSortKey,
                                    perPageTotal,
                                    serverMode,
                                    header,
                                  }: DataTableProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortableStatus>({
    key: defaultSortKey,
    direction: 'asc',
  });
  const itemsPerPage = perPageTotal;
  const sortedData = useMemo(() => {
    if (serverMode) return data;
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if ((a as any)[sortConfig.key] < (b as any)[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if ((a as any)[sortConfig.key] > (b as any)[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);
  const currentData = useMemo(() => {
    if (serverMode) return data;
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, itemsPerPage, sortedData]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const requestSort = useCallback((key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1);
  }, []);
  return (
    <div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <Table hoverable>
          <TableHead>
            <TableRow>
              {header.map((item, index) => (
                <SortableHeadCell key={`sortable_head_cell_${index}`}
                                  label={item.label}
                                  sortKey={item.key}
                                  sortable={item.sortable === null || item.sortable === undefined ? true : item.sortable!}
                                  onSort={requestSort}
                                  isActive={sortConfig.key === item.key}
                                  direction={sortConfig.direction}
                />))}
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {serverMode && <TableRow>
              <TableCell colSpan={header.length} className="text-center py-4">
                <Spinner/>
              </TableCell>
            </TableRow>}
            {currentData.map((item, index) => (
              <TableRow key={`table_row_${index}`}>
                {header.map((headerItem, headerIndex) => (
                  <TableCell key={`table_cell_${headerIndex}`}>{headerItem.render ?
                    <headerItem.render key={`table_cell_render_${headerIndex}`}
                                       item={item} /> : item[headerItem.key]}</TableCell>
                ))}
              </TableRow>
            ))}
            {currentData.length === 0 && (
              <TableRow>
                <TableCell colSpan={header.length} className="text-center py-4">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span
          className="font-semibold">{Math.min(currentPage * itemsPerPage, data.length)}</span> of <span
          className="font-semibold">{data.length}</span> Entries
        </div>
        {currentData.length > 0 && <Pagination
          theme={paginationTheme}
          layout={'pagination'}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showIcons
        />}
      </div>
    </div>
  );
}