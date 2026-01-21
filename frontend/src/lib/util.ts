import { PERMISSION_OPTIONS } from '@/config/setting';
import { CurrentUserResponse } from '@/lib/cms-api/auth';

export const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number = 1000,
) => {
  let timeoutTimer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeoutTimer);
    timeoutTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export function checkPermission(user: CurrentUserResponse | null, action: 'READ' | 'UPDATE' | 'DELETE' | 'CREATE', resource: string): boolean {
  if(!user){
    return false;
  }
  if(user.isRootUser){
    return true;
  }
  const resourceOptions = (PERMISSION_OPTIONS.match as any)[resource];
  if (!resourceOptions) {
    return false;
  }
  return user.permissions.filter((permission) => (permission.action === action || permission.action === '*') && permission.resource === resourceOptions).length > 0;
}