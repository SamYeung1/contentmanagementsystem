import React from 'react';
import { BreadcrumbItem, CmsBreadcrumb } from '@/components/layouts/cms/base/cms-breadcrumb';

interface CmsMainProps {
  breadcrumbItems?: BreadcrumbItem[];
  children?: React.ReactNode;
}

export default function CmsMain({ breadcrumbItems, children }: CmsMainProps) {
  return <div className={'flex flex-col gap-2'}>
    {breadcrumbItems && <CmsBreadcrumb items={breadcrumbItems} />}
    {children}
  </div>;
}