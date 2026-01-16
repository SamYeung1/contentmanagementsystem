import React from 'react';
import CMSLayout from '@/components/layouts/cms/cms-layout';
import { navigationItems } from '@/lib/mock-data';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <CMSLayout navigationItems={navigationItems}>{children}</CMSLayout>;
}