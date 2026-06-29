import { Role } from '@/type/cms';
import BaseItemCms from '@/type/base/base-item-cms';

export interface User extends BaseItemCms{
  id:        number;
  email:     string;
  name:      string;
  roles:     Role[];
}