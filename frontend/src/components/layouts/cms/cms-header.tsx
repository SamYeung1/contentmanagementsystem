import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand } from 'flowbite-react';
import { LogOut, Menu, Settings, X } from 'lucide-react';
import React, { JSX } from 'react';

export default function CmsHeader({isOpenMenu, mobileButtonHandler }: {isOpenMenu:boolean, mobileButtonHandler: () => void }): JSX.Element {
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
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                MyCMS
              </span>
        </NavbarBrand>
      </div>

      {/* Right Side: User Menu */}
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Neil Sims</span>
            <span className="block truncate text-sm font-medium">neil.sims@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem icon={Settings}>Settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={LogOut}>Sign out</DropdownItem>
        </Dropdown>
      </div>
    </Navbar>
  </header>;
}