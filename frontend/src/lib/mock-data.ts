// // Define permissions for each role
// export const ROLE_PERMISSIONS: Record<Role, string[]> = {
//   admin: ['view_dashboard', 'manage_users', 'manage_content', 'delete_content', 'view_settings'],
//   editor: ['view_dashboard', 'manage_content', 'view_settings'],
//   viewer: ['view_dashboard'],
// };

// Mock Users to login with
import { UserResponse } from '@/type/user';

export const MOCK_USERS: UserResponse[] = [
  {
    id: 1,
    email: "admin@gmail.com",
    name: "admin",
    roles: [
      {
        id: 4,
        name: "fff",
        permissions: [
          {
            id: 7,
            action: "READ@user",
            name: "Read User",
            createdAt: "2026-01-07T12:13:16.977Z",
            updatedAt: "2026-01-08T15:28:24.435Z"
          }
        ],
        createdAt: "2026-01-07T13:04:33.926Z",
        updatedAt: "2026-01-07T13:11:33.449Z"
      }
    ],
    createdAt: "2025-12-23T12:59:57.979Z",
    updatedAt: "2026-01-08T16:09:25.100Z",
    createdBy: null,
    updatedBy: {
      id: 1,
      email: "admin@gmail.com",
      name: "admin"
    }
  }
];