import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Checkbox, CloseIcon, HelperText, Label, Spinner, TextInput } from 'flowbite-react';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { debounce } from '@/lib/util';

export interface Option {
  value: string;
  label?: string;
}


interface MultiSelectProps {
  options: Option[];
  label?: string;
  errorMessage?: string;
  defaultValue?: Option[];
  serverMode?: boolean;
  serverModeOption?: ServerModeOption;
  onSelected?: (value: Option[]) => void;
}

export interface ServerModeOption {
  isLoading: boolean;
  onSearch?: (query: string) => void;
}

export default function MultiSelectField({
                                           options,
                                           defaultValue = [],
                                           errorMessage,
                                           label = 'Select Options',
                                           serverModeOption,
                                           serverMode,
                                           onSelected,
                                         }: MultiSelectProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Option[]>(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredOptions = useMemo(() => {
    if (serverMode === true) return options;
    return options.filter((opt) =>
      (opt.label || opt.value).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm]);
  const debouncedSearch = useMemo(
    () => debounce((query: string) => serverModeOption?.onSearch?.(query)),
    [serverModeOption?.onSearch],
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    if (serverMode) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, serverMode, debouncedSearch]);
  useEffect(() => {

  }, [selected]);
  const toggleOption = useCallback((option: Option) => {
    const newSelected = selected.some((item) => item.value === option.value)
      ? selected.filter((item) => item.value !== option.value)
      : [...selected, option];
    setSelected(newSelected);
    if (onSelected) {
      onSelected(newSelected);
    }
  }, [selected, onSelected]);

  const removeOption = (optionValue: string) => {
    const newSelected = selected.filter((item) => item.value !== optionValue);
    setSelected(newSelected); // 1. Update local
    if (onSelected) {
      onSelected(newSelected); // 2. Call parent (Outside the setter!)
    }
  };
  return (
    <div className="w-full">
      <div className="mb-2 block">
        <Label>{label}</Label>
      </div>
      <div className="relative" ref={dropdownRef}>
        <div
          className={`flex flex-wrap items-center justify-between w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer ${
            isOpen ? 'ring-1 ring-blue-500 border-blue-500' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-2">
            {selected.length === 0 ? (
              <span className="text-gray-500 dark:text-gray-400">{t('Common.input.select_placeholder')}</span>
            ) : (
              selected.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {option.label}
                  <button
                    type="button"
                    className="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(option.value);
                    }}
                  >
                    <CloseIcon />
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="text-gray-500">
            <svg className={`w-4 h-4 text-gray-800 dark:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="m19 9-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
            <TextInput type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                       icon={SearchIcon}
                       placeholder={t('Common.input.search_placeholder')} />
            {(serverMode && serverModeOption?.isLoading) ? <div className="flex justify-center p-2"><Spinner /></div>
              : <div className="p-3">
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <li key={option.value}
                          className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                          onClick={() => toggleOption(option)}>
                        <Checkbox
                          checked={selected.some(item => item.value == option.value)}
                          readOnly
                        />
                        <span className="ml-2 w-full">{option.label}</span>
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-center text-gray-500">{t('Common.input.select_no_result')}</li>
                  )}
                </ul>
                <HelperText>{t('Common.input.select_search_hint')}</HelperText>
              </div>
            }

          </div>
        )}
      </div>
      {errorMessage && (
        <HelperText color={'failure'}>
          {errorMessage}
        </HelperText>
      )}
    </div>
  );
};