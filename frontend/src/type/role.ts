import BaseItemCms from '@/type/base/base-item-cms';
import { Permission } from '@/type';

export default interface Role extends BaseItemCms{
  id:          number;
  name:        string;
  permissions: Permission[];
}