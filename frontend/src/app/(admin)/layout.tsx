import React from 'react';
import CMSLayout from '@/components/layouts/cms/cms-layout';
import { navigationItems } from '@/lib/mock-data';
import { currentUser } from '@/lib/cms-api/auth';
import AuthException from '@/exception/api/auth-exception';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    const user = await currentUser();
    return <CMSLayout user={user} navigationItems={navigationItems}>{children}</CMSLayout>;
  } catch (error) {
    if (error instanceof AuthException) {
      redirect('/');
    }
    console.error(error);
  }
}