"use client"
import CmsMain from "@/components/layouts/cms/cms-main";
import { useTranslations } from 'use-intl';
import { BreadcrumbItem } from '@/components/layouts/cms/base/cms-breadcrumb';
import { useMemo } from 'react';

export default function UserPageCreate() {
  const t = useTranslations();
  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => [
    { text: t('DashboardPage.page_title'), href: '/dashboard' },
    { text: t('UserPage.page_title') ,href:'/user'},
    { text: t('UserPage.page_title_create') },
  ], [t]);
  return <CmsMain breadcrumbItems={breadcrumbItems}>
  </CmsMain>;
}