import { NavigationItem } from '@/type/cms';

export const navigationItems: NavigationItem[] = [
  {
    id: 1,
    url: '/dashboard',
    icon: 'LayoutDashboard',
    name: [{
      lang: 'en',
      title: 'Dashboard',
    }],
    sequence:0
  },
  {
    id: 2,
    url: '#',
    icon: 'Settings',
    name: [{
      lang: 'en',
      title: 'CMS Setting',
    }],
    children:[
      {
        id: 3,
        url: '/user',
        icon: 'User',
        name: [{
          lang: 'en',
          title: 'User',
        }],
        sequence:1.0
      },
      {
        id: 4,
        url: '/permission',
        icon: 'UserLock',
        name: [{
          lang: 'en',
          title: 'Permission',
        }],
        sequence:1.1
      },
      {
        id: 5,
        url: '/role',
        icon: 'UserLock',
        name: [{
          lang: 'en',
          title: 'Role',
        }],
        sequence:1.2
      },
    ],
    sequence:1
  },
];