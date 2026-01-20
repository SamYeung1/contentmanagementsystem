'use client';
import React, {useState } from 'react';
import { NavigationItem } from '@/type/navigation-item';
import CmsHeader from '@/components/layouts/cms/cms-header';
import CmsAside from '@/components/layouts/cms/cms-aside';
import { CmsBreadcrumb } from '@/components/layouts/cms/cms-breadcrumb';

interface CMSLayoutProps {
  navigationItems: NavigationItem[];
  children: React.ReactNode;
}
export default function CMSLayout({ navigationItems, children }: CMSLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);
  const mobileButtonHandler = () => setIsOpen(!isOpen);
  return (
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
          {children}
        </main>
      </div>
    </div>
  );
}