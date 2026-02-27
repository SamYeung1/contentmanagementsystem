'use client';
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand } from 'flowbite-react';
import { LogOut, Menu, Settings, X } from 'lucide-react';
import React, { JSX } from 'react';
import ClientOnly from '@/components/client-only';
import { useTranslations } from 'use-intl';
import { useCurrentUser } from '@/context/current-user-context';


interface CmsHeaderProps {
  isOpenMenu: boolean;
  mobileButtonHandler: () => void;
}

export default function CmsHeader({ isOpenMenu, mobileButtonHandler }: CmsHeaderProps): JSX.Element {
  const t = useTranslations('CMSHeader');
  const { user } = useCurrentUser();
  return <header
    className="fixed top-0 z-50 w-full">
    <Navbar fluid>
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => mobileButtonHandler()}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          {isOpenMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <NavbarBrand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                {t('title')}
              </span>
        </NavbarBrand>
      </div>

      {/* Right Side: User Menu */}
      <div className="flex md:order-2">
        <ClientOnly>
          <Dropdown
            id="user-menu-dropdown"
            arrowIcon={false}
            inline
            label={
              <Avatar
                className={'cursor-pointer'}
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{user?.name}</span>
              <span className="block truncate text-sm font-medium">{user?.email}</span>
            </DropdownHeader>
            <DropdownItem icon={Settings}>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem icon={LogOut}>Sign out</DropdownItem>
          </Dropdown>
        </ClientOnly>
      </div>
    </Navbar>
  </header>;
}