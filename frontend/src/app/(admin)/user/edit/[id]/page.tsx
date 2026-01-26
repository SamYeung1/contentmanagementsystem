"use client"
import { useTranslations } from 'use-intl';
import { BreadcrumbItem } from '@/components/layouts/cms/base/cms-breadcrumb';
import { useMemo } from 'react';
import CmsMain from '@/components/layouts/cms/cms-main';

export default function UserPageEdit() {
  const t = useTranslations();
  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => [
    { text: t('DashboardPage.page_title'), href: '/dashboard' },
    { text: t('UserPage.page_title') ,href:'/user'},
    { text: t('UserPage.page_title_edit') },
  ], [t]);
  return <CmsMain breadcrumbItems={breadcrumbItems}>
  </CmsMain>;
}