// // Define permissions for each role
// export const ROLE_PERMISSIONS: Record<Role, string[]> = {
//   admin: ['view_dashboard', 'manage_users', 'manage_content', 'delete_content', 'view_settings'],
//   editor: ['view_dashboard', 'manage_content', 'view_settings'],
//   viewer: ['view_dashboard'],
// };

// Mock Users to login with
import { UserResponse } from '@/type/user';
import { NavigationItem } from '@/type/navigation-item';

export const MOCK_USERS: UserResponse[] = [
  {
    id: 1,
    email: 'admin@gmail.com',
    name: 'admin',
    roles: [
      {
        id: 4,
        name: 'fff',
        permissions: [
          {
            id: 7,
            action: 'READ@user',
            name: 'Read User',
            createdAt: '2026-01-07T12:13:16.977Z',
            updatedAt: '2026-01-08T15:28:24.435Z',
          },
        ],
        createdAt: '2026-01-07T13:04:33.926Z',
        updatedAt: '2026-01-07T13:11:33.449Z',
      },
    ],
    createdAt: '2025-12-23T12:59:57.979Z',
    updatedAt: '2026-01-08T16:09:25.100Z',
    createdBy: null,
    updatedBy: {
      id: 1,
      email: 'admin@gmail.com',
      name: 'admin',
    },
  },
  {
    id: 2,
    email: 'adminssss@gmail.com',
    name: 'admin',
    roles: [
      {
        id: 4,
        name: 'fff',
        permissions: [
          {
            id: 7,
            action: 'READ@user',
            name: 'Read User',
            createdAt: '2026-01-07T12:13:16.977Z',
            updatedAt: '2026-01-08T15:28:24.435Z',
          },
        ],
        createdAt: '2026-01-07T13:04:33.926Z',
        updatedAt: '2026-01-07T13:11:33.449Z',
      },
    ],
    createdAt: '2025-12-23T12:59:57.979Z',
    updatedAt: '2026-01-08T16:09:25.100Z',
    createdBy: null,
    updatedBy: {
      id: 1,
      email: 'admin@gmail.com',
      name: 'admin',
    },
  },
];

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