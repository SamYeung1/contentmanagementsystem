export type Role = 'admin' | 'editor' | 'viewer';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: string[];
  avatar: string;
};

// Define permissions for each role
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: ['view_dashboard', 'manage_users', 'manage_content', 'delete_content', 'view_settings'],
  editor: ['view_dashboard', 'manage_content', 'view_settings'],
  viewer: ['view_dashboard'],
};

// Mock Users to login with
export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    permissions: ROLE_PERMISSIONS.admin,
    avatar: 'https://ui.shadcn.com/avatars/01.png',
  },
  {
    id: '2',
    name: 'Editor User',
    email: 'editor@example.com',
    role: 'editor',
    permissions: ROLE_PERMISSIONS.editor,
    avatar: 'https://ui.shadcn.com/avatars/02.png',
  },
];