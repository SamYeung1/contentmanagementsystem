import MultiSelectField, { Option } from '@/components/forms/fields/multi-select-field';
import { useEffect, useState } from 'react';
import { isPageResponse } from '@/lib/util';

interface ServerMultiSelectFieldProps {
  label?: string;
  name: string;
  errorMessage?: string;
  defaultValue?: string[];
  url: string;
  textMapper: (item: any) => Option;
}

export default function ServerMultiSelectField({
                                                 name,
                                                 url,
                                                 label,
                                                 defaultValue,
                                                 errorMessage,
                                                 textMapper,
                                               }: ServerMultiSelectFieldProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<Option[]>([]);
  const [query, setQuery] = useState<string>(''); // Track search query

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      search: query,
      listAll: '1',
    });
    setLoading(true);
    fetch(`${url}?${params.toString()}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((result) => {
        if (isPageResponse(result)) {
          setList(result.results.map(textMapper));
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') console.error('Fetch error:', error);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url, query]);

  return (
    <MultiSelectField
      options={list}
      name={name}
      label={label}
      defaultValue={defaultValue}
      errorMessage={errorMessage}
      serverMode={true}
      serverModeOption={{
        isLoading: loading,
        onSearch: (value) => setQuery(value),
      }}
    />
  );
}