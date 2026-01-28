import { Button, TextInput } from 'flowbite-react';
import { PlusIcon, SearchIcon } from 'lucide-react';
import React, { JSX, useEffect, useMemo, useRef } from 'react';
import { debounce } from '@/lib/util';
import { useTranslations } from 'use-intl';


export interface DataTableHeaderPermission {
  canAdd: boolean;
}

interface DataTableHeaderProps {
  leftRender?: React.ReactNode;
  addButton: {
    title: string;
    onClick?: () => void;
    permission: DataTableHeaderPermission;
  };
  onSearch?: (text: string) => void;
}

export default function DataTableHeader({ leftRender, addButton, onSearch }: DataTableHeaderProps): JSX.Element {
  const t = useTranslations("Common");
  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);
  const handleDebounce = useMemo(
    () => debounce((value:string) => {
      if (onSearchRef.current) {
        onSearchRef.current(value);
      }
    }),
    []
  );
  return <div className="flex items-center justify-between">
    <div>
      {leftRender || <TextInput type="search" onChange={(e) => {
        handleDebounce((e.target as HTMLInputElement).value);
      }} icon={SearchIcon} placeholder={t('input.search_placeholder')} />}
    </div>
    <div>
      {(addButton.permission.canAdd && <Button onClick={addButton.onClick}><PlusIcon /><span
        className={'hidden sm:block'}>{addButton.title}</span></Button>)}
    </div>
  </div>;
}