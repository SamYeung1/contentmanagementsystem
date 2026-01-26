import {
  Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems,
} from 'flowbite-react';
import { HelpCircle, icons } from 'lucide-react';
import React, { JSX } from 'react';
import { NavigationItem } from '@/type/cms';
import { useLocale } from 'use-intl';
import ClientOnly from '@/components/client-only';

const DynamicIconRenderer = ({ name, ...props }: { name: string; [key: string]: any }) => {
  const LucideIcon = (icons as any)[name];
  if (!LucideIcon) {
    return <HelpCircle {...props} />;
  }
  return <LucideIcon {...props} />;
};

interface CmsAsideProps {
  isOpenMenu: boolean;
  navigationItems: NavigationItem[];
}

export default function CmsAside({ isOpenMenu, navigationItems }: CmsAsideProps): JSX.Element {
  const currentLanguage = useLocale();
  return <aside
    className={`fixed left-0 top-0 z-40 h-full pt-16 lg:pt-0 transition-transform lg:static lg:translate-x-0 ${
      isOpenMenu ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    <div className="h-full overflow-y-auto">
      <Sidebar>
        <SidebarItems>
          <SidebarItemGroup>
            <ClientOnly>
              {navigationItems.sort((a, b) => a.sequence - b.sequence).map((item, index) => (item.children && item.children?.length > 0 ?
                  <SidebarCollapse className={'cursor-pointer'} key={`sidebar_item_navigation_${index}`}
                                   icon={() => <DynamicIconRenderer name={item.icon} />}
                                   label={item.name.find((item) => item.lang === currentLanguage)?.title}>
                    {
                      item.children.map((childrenItem, childrenIndex) => (<SidebarItem
                        key={`sidebar_item_navigation_${index}_child_${childrenIndex}`}
                        icon={() => <DynamicIconRenderer name={childrenItem.icon} />}
                        href={childrenItem.url}>{childrenItem.name.find((item) => item.lang === currentLanguage)?.title}</SidebarItem>))
                    }
                  </SidebarCollapse> : <SidebarItem key={`sidebar_item_navigation_${index}`} href={item.url}
                                                    icon={() => <DynamicIconRenderer name={item.icon} />}>
                    {item.name.find((item) => item.lang === currentLanguage)?.title}
                  </SidebarItem>
              ))}
            </ClientOnly>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  </aside>;
}