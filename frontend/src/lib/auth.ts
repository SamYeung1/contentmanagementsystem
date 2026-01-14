import { UserResponse } from '@/type';
import { MOCK_USERS } from '@/lib/mock-data';

export const login = (email: string) => new Promise<UserResponse>((resolve, reject) => {
  // Simulate API delay
  setTimeout(() => {
    const foundUser = MOCK_USERS.find((u) => u.email === email);
    if (foundUser) {
      resolve(foundUser);
    } else {
      reject('User not found!');
    }
  }, 1000);
});