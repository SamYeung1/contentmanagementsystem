import React from 'react';
import CMSLayout from '@/components/layouts/cms/cms-layout';
import { navigationItems } from '@/lib/mock-data';
import { currentUser } from '@/lib/cms-api/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  return <CMSLayout user={user} navigationItems={navigationItems}>{children}</CMSLayout>;
}