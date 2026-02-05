import { PERMISSION_OPTIONS } from '@/config/setting';
import { CurrentUserResponse } from '@/lib/cms-api/auth';
import PageResponse from '@/type/base/page-response';
import AuthException from '@/exception/api/auth-exception';
import PermissionException from '@/exception/api/permission-exception';
import ApiException from '@/exception/api/api-exception';
import { _Translator } from 'next-intl';

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

export function isPageResponse(data: any): data is PageResponse<any> {
  return (
    data &&
    typeof data.total === 'number' &&
    Array.isArray(data.results)
  );
}
export function handleError(res: Response) {
  if (res.status === 401) {
    throw new AuthException();
  }
  if (res.status === 403) {
    throw new PermissionException();
  }
  if (!res.ok) {
    throw new ApiException();
  }
}

export function handleErrorForm(error: unknown,t:_Translator,formData: FormData) {
  if (error instanceof AuthException) {
    return { serverError: { success: false, message: t('Common.message.auth_error') }, payload: formData };
  }else if(error instanceof PermissionException){
    return { serverError: { success: false, message: t('Common.message.permission_error') }, payload: formData };
  }
  console.error(error);
  return { serverError: { success: false, message: 'Error'}, payload: formData };
}