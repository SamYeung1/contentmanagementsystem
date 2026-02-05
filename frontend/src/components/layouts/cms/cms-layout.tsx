'use client';
import React, { useState } from 'react';
import { NavigationItem } from '@/type/cms';
import CmsHeader from '@/components/layouts/cms/base/cms-header';
import CmsAside from '@/components/layouts/cms/base/cms-aside';
import { usePathname } from 'next/navigation';
import { checkPermission } from '@/lib/util';
import { CurrentUserResponse } from '@/lib/cms-api/auth';
import CurrentUserProvider from '@/context/current-user-context';
import { ErrorAlert } from '@/components/alert/error-alert';
import { useTranslations } from 'use-intl';
import { AlertProvider } from '@/context/alert-context';

interface CMSLayoutProps {
  navigationItems: NavigationItem[];
  user: CurrentUserResponse;
  children: React.ReactNode;
}

export default function CMSLayout({ user, navigationItems, children }: CMSLayoutProps) {
  const pathname = usePathname() || '';
  const t = useTranslations('Common');
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);
  const mobileButtonHandler = () => setIsOpen(!isOpen);
  return (<AlertProvider><CurrentUserProvider user={user}>
      <div className="flex flex-col h-screen">
        <CmsHeader isOpenMenu={isOpen} mobileButtonHandler={mobileButtonHandler} />
        <div className="flex flex-1 pt-16 overflow-hidden">
          <CmsAside isOpenMenu={isOpen} navigationItems={navigationItems} />
          {/* --- Overlay for Mobile --- */}
          {isOpen && (
            <div
              className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden"
              onClick={closeSidebar}
            />
          )}
          <main className="flex-1 relative overflow-y-auto p-4">
            {!checkPermission(user, 'READ', pathname) && <ErrorAlert message={t('alert.permission_message')} />}
            {checkPermission(user, 'READ', pathname) && children}
          </main>
        </div>
      </div>
    </CurrentUserProvider></AlertProvider>
  );
}